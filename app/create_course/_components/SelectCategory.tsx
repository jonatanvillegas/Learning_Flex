'use client'
import React from 'react'
import { ItemsCategory } from '../CategoryList'
import Image from 'next/image'
import { useUserInput } from '@/app/_store/Zustand'

function SelectCategory() {
  const { setUserCourseInput,userCourseInput} = useUserInput();

  const handlerSlect = (categoria:string) => {
    setUserCourseInput( 'categoria',categoria );
  }
  return (
    <div className='px-10 md:px-20'>
        <h2 className='my-5 text-2xl'>Selecciona la Categoría de tu ruta de aprendizaje</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
        {
          ItemsCategory.map((Item, Index) => {
            const isSelected = userCourseInput.categoria == Item.nombre
            return (
              <div key={Index} className={`flex flex-col p-5 border items-center rounded-lg hover:border-primary hover:bg-blue-100 
                ${isSelected && "border-primary bg-blue-100"}`}
                onClick={()=>handlerSlect(Item.nombre)}
              >
                <Image src={Item.icon} width={80} height={80} alt={Item.nombre} />
                <h2>{Item.nombre}</h2>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SelectCategory
