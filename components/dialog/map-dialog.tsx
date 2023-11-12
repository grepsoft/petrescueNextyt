import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LatLong } from '@/types'
import Map from '../map'

// 43.6425662,-79.3870568
function MapDialog({
    open,
    onClose,
    latlong
}: {
    open: boolean,
    onClose: () => void,
    latlong: LatLong
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle>
                </DialogHeader>
                <Map coordinates={latlong.coordinates} />
            </DialogContent>
        </Dialog>

    )
}

export default MapDialog