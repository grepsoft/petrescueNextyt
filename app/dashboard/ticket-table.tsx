import { buildUrl } from '@/lib/utils'
import { Ticket } from '@/types'
import React from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'

async function TicketTable() {

    const tickets = await fetch(buildUrl('ticket'),{
        cache: 'no-cache'
    })

    const ticketsJson: Ticket[] = await tickets.json()

    console.log(ticketsJson)
  return (
    <DataTable 
      columns={columns}
      data={ticketsJson}
    />

  )
}

export default TicketTable