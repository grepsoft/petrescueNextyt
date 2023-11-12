import { connectToDB } from "@/lib/db";
import { TicketModel } from "@/schemas/ticket";


export async function GET() {

    try {
        await connectToDB()

        const tickets = await TicketModel.find({}).populate('assignedInspector')

        return Response.json(tickets)
    } catch(error) {
        console.log(error);
        return Response.json({message: "Failed to get tickets"});
    }
}