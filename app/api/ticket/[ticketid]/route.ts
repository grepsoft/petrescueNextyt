import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { TicketStatus } from "@/types";
import { deleteObject } from "firebase/storage";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
    { params }: { params: { ticketid: string } }
) {

    try {
        await connectToDB()

        const ticketId = params.ticketid

        if (!ticketId) {
            return new NextResponse("Ticketid is required", { status: 400 })
        }

        let ticket = await TicketModel.findByIdAndDelete(ticketId)

        if (ticket) {
            // if there is a photo then remove that as well
            if( ticket.photo) {
                const ref = storageRef(ticket.photo)
                await deleteObject(ref)
            }
            
            return NextResponse.json({
                ticket: ticket,
                message: "Ticket deleted"
            })
        } else {
            return NextResponse.json({
                message: "Ticket not found"
            })
        }

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params } : { params : { ticketid: string }}
) {
    await connectToDB();
    
    const body = await req.json();

    const { inspector, status } = body;
    const ticketId = params.ticketid;

    if( !ticketId) {
        return new NextResponse("Ticketid is required", { status: 400});
    }

    // make sure the ticket exist
    const ticket = await TicketModel.findById(ticketId);
    if( !ticket ) {
        return new NextResponse("Invalid ticket", { status: 404 });
    }

    if( status === TicketStatus.UNASSIGNED) {
        ticket.assignedInspector = null
    } else
        ticket.assignedInspector = inspector || ticket.assignedInspector

    ticket.status = status || ticket.status

    await ticket.save()

    return NextResponse.json({
        ticket: ticket,
        message: "Ticket updated"
    })
}