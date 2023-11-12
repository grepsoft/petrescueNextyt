"use client"

import { Button } from '@/components/ui/button'
import { Ticket, TicketStatus, User } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useReducer, useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { AiOutlineUserAdd,AiOutlineUserDelete, AiOutlineCheck } from 'react-icons/ai'
import { BsFillMapFill,BsFillTrashFill } from 'react-icons/bs'
import AlertModal from '@/components/modal/alert-modal'
import { buildUrl } from '@/lib/utils'
import { toast } from 'react-toastify'
import InspectorList from './inspector-list'
import MapDialog from '@/components/dialog/map-dialog'

enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

interface RowActionReducerProps {
    alertDialog?: boolean,
    alertDialogReason?: AlertDialogReasonEnum,
    mapDialog?: boolean
}

export function RowActions({
    row
}: {
    row: Row<Ticket>
}) {

    const ticket = row.original
    const router = useRouter()
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    // using reducer
    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: RowActionReducerProps) => {
        return {...prevstate, ...params}
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    })

    const handleDelete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.DELETE
        })
    }

    const handleMarkComplete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.MARK_COMPLETE
        })
    }

    const handleConfirm = async () => {
        if( state.alertDialogReason === AlertDialogReasonEnum.DELETE) {

            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: "DELETE"
            })
            setProgress(false)
            toast.success('Ticket deleted')
            router.refresh()
        } else if (state.alertDialogReason === AlertDialogReasonEnum.MARK_COMPLETE) {
            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.COMPLETED
                })
            })

            setProgress(false)
            toast.success('Ticket status updated')
            router.refresh()
        }
    }
    
    const handleInspectorAssign = async (inspector: User) => {
        try {
            setProgress(true)

            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    inspector: inspector.id,
                    status: TicketStatus.ASSIGNED
                })
            })

            setProgress(false)
            toast.success(`Ticket assigned to ${inspector.fullName}`)
            router.refresh()
        } catch (error) {
            setProgress(false)
            console.log(error)
        }
    }

    const handleUnassign = async () => {
        try {
            setProgress(true);
            // fire an api call to update the ticket
            const result = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.UNASSIGNED
                })
            });

            const { status } = result;
            setProgress(false);
            if (status === 200) {
                toast.success(`Ticket marked as unassigned`);
                router.refresh();
            } else {
                toast.error("Failed to update ticket")
            }

        } catch (error) {
            setProgress(true);
            toast.error("Server error")
            console.log(error);
        }
    }

    const handleMapview = () => {
        setState({
            mapDialog: true
        })
    }
  return (
    <>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className='flex h-8 w-8 p-0 data-[state=open]:bg:muted'
                >
                    <span className='sr-only'>Open Menu</span>
                    <MdMoreVert />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setOpen(true)}>
                    <AiOutlineUserAdd className="mr-2 h-4 w-4"/>
                    Assign
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUnassign}>
                    <AiOutlineUserDelete className="mr-2 h-4 w-4"/>
                    UnAssign
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleMapview}>
                    <BsFillMapFill className="mr-2 h-4 w-4"/>
                    Map View
                </DropdownMenuItem>
                <DropdownMenuItem className="text-green-600" onClick={handleMarkComplete}>
                    <AiOutlineCheck className="mr-2 h-4 w-4"/>
                    Mark complete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                    <BsFillTrashFill className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <MapDialog 
            open={state.mapDialog!}
            onClose={() => setState({mapDialog: false})}
            latlong={ticket.latlong!}
        />
        <InspectorList open={open} setOpen={setOpen} onInspectorAssign={handleInspectorAssign}/>
        <AlertModal 
            open={state.alertDialog!}
            onClose={() => setState({
                alertDialog: false,
                alertDialogReason: AlertDialogReasonEnum.NONE
            })}
            onConfirm={handleConfirm}
        />
    </>
  )
}

export default RowActions