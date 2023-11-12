'use client'

import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { User } from '@/types'
import React, { useState } from 'react'


function InspectorList({
    open,
    setOpen,
    onInspectorAssign
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onInspectorAssign: (value: User) => void
}) {

    const [inspector, setInspector] = useState<User>()

    const handleInspectorSelect = (user: User) => {
        setInspector(user)
    }

    const handleOpenChange = () => {
        setOpen(false)
    }

    const handleAssign = () => {
        onInspectorAssign(inspector as User)
        setOpen(false)
    }
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Inspector List</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <Combobox onValueSelect={handleInspectorSelect} />
                </div>
                <SheetFooter>
                    <Button onClick={handleOpenChange} variant="outline" type='button'>Close</Button>
                    <Button onClick={handleAssign}>Assign</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default InspectorList