export type Ticket = {
    id: number,
    submitterName: string
    submitterPhone: string
    submitterEmail?: string
    pet?: string,
    assignedInspector?: string
    dateOfRequest: Date
    resolvedDate?: Date
    status: string
    notes?: string
    photo?: string
    latlong?: LatLong
}

export type LatLong = {
    type?: string,
    coordinates: number[]
}

export type User = {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    fullName: string
}

export enum TicketStatus {
    NEW = 'new',
    COMPLETED = 'completed',
    ASSIGNED = 'assigned',
    UNASSIGNED = 'unassigned'
}