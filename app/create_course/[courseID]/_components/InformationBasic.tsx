'use client'
import { Button } from '@/components/ui/button'
import { CourseIA, Curso } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'


type props = {
    course: Curso
}

const InformationBasic = ({ course }: props) => {
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    //obtener imagen del usuario
    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          const file = files[0]; 
          setSelectedFile(file)
        }
      };
    
    return (
        <div className='p-10 boder rounded-xl shadow-md mt-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div >
                    <h2 className='font-bol text-2xl'>{course.titulo}</h2>
                    <p className='text-xs text-gray-400 mt-3 truncate'>{course?.descripcion}</p>
                    <h2 className='font-medium flex gap-2 items-center mb-5'>{course?.categoria}</h2>
                    <Button className='bg-primary w-full'>
                        Iniciar
                    </Button>
                </div>
                <div>
                    <label htmlFor="upload">
                        <Image src={selectedFile? URL.createObjectURL(selectedFile) : "/placeholder.jpg"}
                            width={200}
                            height={200}
                            alt='carga de imagen'
                            className='w-full rounded-xl h-[250px] object-cover cursor-pointer'
                        />
                    </label>
                    <input type="file" id='upload' className='opacity-0'
                        onChange={onFile}
                    />
                </div> 
            </div>
        </div>
    )
}

export default InformationBasic