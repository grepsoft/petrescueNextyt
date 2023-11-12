import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from '../ui/alert-dialog'
import Image from 'next/image'

function PhotoModal({
    open, onClose, url
}: {
    open: boolean, onClose: () => void, url: string
}) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent className='p-4'>
            {
                url &&
                <Image width={800} height={800} 
                src={url} alt="pet photo" />
            }
            <AlertDialogFooter>
                <AlertDialogCancel
                className='w-full bg-black text-white'
                >Close</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default PhotoModal