import { connectToDB } from "@/lib/db";
import { storageRef } from "@/lib/firebase";
import { TicketModel } from "@/schemas/ticket";
import { Ticket } from "@/types";
import { deleteObject } from "firebase/storage";
import { ObjectId } from "mongodb";

export async function PATCH(
    req: Request
) {

    try {
        await connectToDB();

        const body = await req.json();
        const { tickets, status } = body;

        await TicketModel.updateMany({
            _id: tickets.map((t: ObjectId) => t)
        }, {
            status: status
        }
        );

        return Response.json("Tickets updated");

    } catch (error) {
        console.log(error);
        return Response.json("Failed to update tickets");
    }
}

export async function DELETE(
    req: Request
) {
    try {
        const body = await req.json();
        const { tickets } = body;
        const ticketsToDelete = await TicketModel.find<Ticket>({
            _id: tickets.map((t: ObjectId) => t)
        });

        await TicketModel.deleteMany({
            _id: tickets.map((t: ObjectId) => t)
        });

        // TODO: also delete the firebase image
        if( ticketsToDelete.length > 0 ) {
            for(const ticket of ticketsToDelete) {
                if( ticket.photo) {
                    const ref = storageRef(ticket.photo)
                    await deleteObject(ref)
                }
            }
        }
        
        return Response.json("Tickets deleted");
    } catch (error) {
        console.log(error);
        return Response.json("Failed to delete tickets");
    }

}
