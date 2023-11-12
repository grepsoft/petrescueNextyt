"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ticket, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CiImageOff } from 'react-icons/ci';
import { AiOutlineArrowUp } from 'react-icons/ai'
import { Badge } from "@/components/ui/badge";
import { RowActions } from "./row-actions";
import { Checkbox } from "@/components/ui/checkbox";


export const columns: ColumnDef<Ticket>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="select row"
            />
        ),
        enableSorting: false
    },
    {
        accessorKey: 'photo',
        header: "Photo",
        cell: ({ row, table }) => (
            <Avatar>
                <AvatarImage
                    className="cursor-pointer"
                    src={`${row.getValue('photo')}`}
                    onClick={() => table.options.meta?.photoThumbClicked(row.id)}
                />
                <AvatarFallback><CiImageOff /></AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: "submitterName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <AiOutlineArrowUp className='ml-2 h-4 w-4' />
                </Button>
            )
        }
    },
    {
        accessorKey: "submitterPhone",
        header: "Phone"
    },
    {
        accessorKey: 'assignedInspector',
        header: "Assigned to",
        cell: ({row}) => (row.getValue('assignedInspector') as User)?.fullName || ''
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            let color = 'bg-green-300'

            const status: string = row.getValue('status')

            switch(status) {
                case 'new':
                    color = 'bg-orange-300'
                    break;
                case 'assigned':
                    color = 'bg-purple-300'
                    break;
                case 'unassigned':
                    color = 'bg-red-300'
                    break
            }

            return <Badge className={`${color}`}>{status}</Badge>
        }
    },
    {
        id: 'actions',
        cell: ({row}) => <RowActions row={row} />
    }
]