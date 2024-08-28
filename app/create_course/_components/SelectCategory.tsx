'use client'
import React from 'react'
import { ItemsCategory } from '../CategoryList'
import Image from 'next/image'

function SelectCategory() {
  return (
    <div className='grid grid-cols-3 gap-10 px-10 md:px-20'>
      {
        ItemsCategory.map((Item,Index)=>{
            return (
                <div className='flex flex-col p-5 border items-center rounded-lg hover:border-primary hover:bg-blue-100'>
                    <Image src={Item.icon} width={80} height={80}  alt={Item.nombre} />
                    <h2>{Item.nombre}</h2>
                </div>
            )
        })
      }
    </div>
  )
}

export default SelectCategory
