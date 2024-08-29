'use client'
import React, { useState } from 'react'
import { ItemsCreate } from './ItemsCrear'
import { HiLightBulb } from "react-icons/hi";
import { MdCategory } from "react-icons/md";
import { IoOptions } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import Description from './_components/Description';
import SelectOprion from './_components/SelectOprion';
import { useUserInput } from '../_store/Zustand';

function page() {

  const [ActivarItem, setActivarItem] = useState(0);
  const {userCourseInput} = useUserInput()

  const ChekedStatus = () => {
    if (Object.keys(userCourseInput).length == 0) true;
    if (ActivarItem == 0 && (userCourseInput?.categoria == "categoria"||userCourseInput?.categoria == undefined )){
      return true
    }
  }
  
  return (
    <div>
      {/*Titulo e iconos  */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-3xl text-primary font-bold uppercase'>Crear curso</h2>
        <div className='flex'>
          {ItemsCreate.map((Item, Index) => {
            return (
              <div key={Index} className='flex items-center mt-10'>
                <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                  <div className={`${ActivarItem >= Index ? 'bg-blue-700' : 'bg-gray-300'} p-3 rounded-full text-white`}>
                    {<Item.icon />}
                  </div>
                  <h2 className='hidden md:block md:text-sm mt-2'>{Item.nombre}</h2>
                </div>
                {Index != ItemsCreate.length - 1 &&
                  <div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px]
                    ${ActivarItem > Index ? 'bg-blue-700' : 'bg-gray-300'}
                    `}></div>
                }

              </div>
            )
          })}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
          { ActivarItem === 0 ?<SelectCategory/> : ActivarItem === 1 ?<Description/>: 
          ActivarItem ===2 ?<SelectOprion/>: null}
      </div>

      <div className='flex justify-between mt-10 mx-4'>
        <Button disabled={ActivarItem == 0} variant='outline' onClick={() => setActivarItem(ActivarItem - 1)}>Regresae</Button>
        {ActivarItem < 2 && (
          <Button
          disabled={ChekedStatus()}
          onClick={() => setActivarItem(ActivarItem + 1)}
        >
          Siguiente
        </Button>)}
        {ActivarItem == 2 && (<Button
        >
          Generar Curso
        </Button>)}
      </div>
    </div>
  )
}

export default page
