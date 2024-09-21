import { Capitulo } from '@/types'
import React from 'react'
import { CiCircleCheck } from "react-icons/ci";

type props = {
  capitulo: Capitulo
  index: number
  key:number
}

const ListChapter = ({ capitulo, index }: props) => {
  return (
    <div className='mt-3'>
      <div className=' flex justify-between items-center border rounded-lg mb-2 shadow-md'>
        <div className='flex gap-4 items-center m-2'>
          <h2 className='bg-primary h-10 w-10 text-white rounded-full text-center p-2'>
            {index + 1}
          </h2>
          <div className='flex gap-1 flex-col'>
            <h2 className='font-medium text-lg'>{capitulo.nombre}</h2>
            <p className='text-sm text-gray-500'>{capitulo.descripcion}</p>
            <p className='text-primary font-semibold'>{capitulo.duracion}</p>
          </div>
        </div>
        {/* icono de check */}
        <div className='mr-2'>
          <CiCircleCheck color='green' size={25} />
        </div>
      </div>
    </div>
  )
}

export default ListChapter
