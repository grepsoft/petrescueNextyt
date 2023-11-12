import { connectToDB } from "@/lib/db"
import { TicketModel } from "@/schemas/ticket"


export async function GET() {

    try {

        await connectToDB()

        const tickets = await TicketModel.aggregate([
            {
                $group: {
                    _id: { status: '$status'},
                    count: { $sum: 1}
                }
            }
        ])

        return Response.json(tickets)

    }catch(error) {
        console.log(error)
        return Response.json({
            message: "failed to get ticket stats"
        })
    }
}