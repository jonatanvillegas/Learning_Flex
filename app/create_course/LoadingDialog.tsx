import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

type props ={
    loading:boolean,
    titulo: string
}
const LoadingDialog = ({loading,titulo}:props) => {
    return (
        <div>
            <AlertDialog  open={loading}>
                <AlertDialogContent  className="bg-[#021744] text-white">
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            <div className='flex flex-col items-center py-10'>
                                <Image src={"/loading.gif"} width={200} height={200} alt='gif cargando'/>
                                <h3>{titulo}</h3>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LoadingDialog
