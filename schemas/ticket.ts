import { Ticket, TicketStatus } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";


const TicketSchema = new Schema<Ticket>({
    submitterName: String,
    submitterPhone: String,
    submitterEmail: String,
    assignedInspector: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null
    },
    dateOfRequest: { type: Date, default: Date.now() },
    resolvedDate: Date,
    status: {
        type: String,
        default: TicketStatus.NEW,
        get: (v: any) => `${v}`
    },
    notes: String,
    photo: String,
    // source: https://www.mongodb.com/docs/manual/reference/geojson/
    latlong: {
        type: { type: String, default: "Point"},
        coordinates: [Number]
    }
}, {
    toJSON: { getters: true }
});

export const TicketModel = models.Ticket || model('Ticket', TicketSchema)