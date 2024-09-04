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
import LoadingDialog from './LoadingDialog';
import { Curso } from '@/types';
import prisma from '@/lib/prisma';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';


function page() {

  const [loading, setLoading] = useState(false)
  const [ActivarItem, setActivarItem] = useState(0);
  const { userCourseInput } = useUserInput()
  const {user} = useUser()
  const router = useRouter()

  const ChekedStatus = () => {
    if (Object.keys(userCourseInput).length == 0) true;

    if (ActivarItem == 0 && (userCourseInput?.categoria == "categoria" || userCourseInput?.categoria == undefined)) {
      return true
    }
    if (ActivarItem == 1 && (userCourseInput?.Titulo == undefined || userCourseInput?.Titulo.length == 0)) {
      return true
    }
    if (ActivarItem == 2 &&
      (userCourseInput?.Dificultad == undefined ||
        userCourseInput?.Duracion == undefined ||
        userCourseInput?.AgregarVideo == undefined ||
        userCourseInput?.numCapitulos == undefined
      )) {
      return true
    }
    return false
  }

  const handlerGenerarCurso = async () => {
    setLoading(true)
    const prompt = 'genera el curso categoria:' + userCourseInput?.categoria + 'Titulo:' + userCourseInput?.Titulo
      + 'Dificultad:' + userCourseInput?.Dificultad + 'Duracion:' + userCourseInput?.Duracion + 'numCapitulos:' +
      userCourseInput?.numCapitulos

    const respuesta = await fetch('/api/crear-curso', {
      method: 'POST', // Método de la solicitud
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido que se envía
      },
      body: JSON.stringify({ prompt }), // Convertir el prompt a JSON y enviarlo en el cuerpo de la solicitud
    });

    // Verificar si la solicitud fue exitosa
    if (respuesta.ok) {
      const data = await respuesta.json(); // Leer la respuesta como JSON
      console.log(data)
      const {id} = data
      router.replace("/create_course/"+id)
      setLoading(false)
    } else {
      console.error('Error:', respuesta.statusText); // Manejar el error si la solicitud falla
    }
  }

    return (
      <div>
        {/*Titulo e iconos  */}
        <div className='flex flex-col justify-center items-center mt-10'>
          <h2 className='text-3xl text-primary font-bold uppercase'>Crear curso</h2>
          <div className='flex mt-5'>
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
          {ActivarItem === 0 ? <SelectCategory /> : ActivarItem === 1 ? <Description /> :
            ActivarItem === 2 ? <SelectOprion /> : null}
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
            onClick={() => handlerGenerarCurso()}
          >
            Generar Curso
          </Button>)}
        </div>
        <LoadingDialog loading={loading} />
      </div>
    )
  }


export default page
