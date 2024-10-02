'use client'
import React, { useEffect, useState } from 'react'
import { ItemsCreate } from './ItemsCrear'
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import Description from './_components/Description';
import SelectOprion from './_components/SelectOprion';
import { useUserInput } from '../_store/Zustand';
import LoadingDialog from './LoadingDialog';
import { useRouter } from 'next/navigation';
import { useCourse } from '../_store/curso';

function Page() {
  const [loading, setLoading] = useState(false);
  const [ActivarItem, setActivarItem] = useState(0);
  const { userCourseInput } = useUserInput();
  const router = useRouter();

  const {setCourse} = useCourse()
  // Función para comprobar si los campos son válidos
  const ChekedStatus = () => {
    if (Object.keys(userCourseInput).length === 0) return true;

    if (ActivarItem === 0 && (userCourseInput?.categoria === "categoria" || userCourseInput?.categoria === undefined)) {
      return true;
    }
    if (ActivarItem === 1 && (!userCourseInput?.Titulo || userCourseInput?.Titulo.length === 0)) {
      return true;
    }
    if (ActivarItem === 2 &&
      (!userCourseInput?.Dificultad ||
        !userCourseInput?.Duracion ||
        userCourseInput?.AgregarVideo === undefined ||
        userCourseInput?.numCapitulos === undefined
      )) {
      return true;
    }
    return false;
  };

  // Función para manejar la generación del curso
  const handlerGenerarCurso = async () => {
    setLoading(true); // Indicar que la carga ha comenzado
  
    const prompt = `genera el curso categoria:${userCourseInput?.categoria} Titulo:${userCourseInput?.Titulo} Dificultad:${userCourseInput?.Dificultad} Duracion:${userCourseInput?.Duracion} numCapitulos:${userCourseInput?.numCapitulos}`;
  
    try {
      const respuesta = await fetch('/api/crear-curso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (respuesta.ok) {
        const data = await respuesta.json();
        const { course } = data;
        const { idCourse } = course;
  
        // Setear el curso en el estado global
        setCourse(course)
        // Redirigir al usuario al curso creado
        router.replace(`/create_course/${idCourse}`);
      } else {
        console.error('Error:', respuesta.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    useEffect(() => {
      setLoading(false); // Indicar que la carga ha terminado
    }, []);
  };

  return (
    <div>
      {/* Título e iconos */}
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-3xl text-primary font-bold uppercase dark:text-white'>Crear curso</h2>
        <div className='flex mt-5'>
          {ItemsCreate.map((Item, Index) => {
            return (
              <div key={Index} className='flex items-center mt-10'>
                <div className={`flex flex-col items-center w-[50px] md:w-[100px]`}>
                  <div className={`${ActivarItem >= Index ? 'bg-blue-700' : 'bg-gray-300'} p-3 rounded-full text-white`}>
                    {<Item.icon />}
                  </div>
                  <h2 className='hidden md:block md:text-sm mt-2'>{Item.nombre}</h2>
                </div>
                {Index !== ItemsCreate.length - 1 &&
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
        {ActivarItem === 0 ? <SelectCategory /> :
          ActivarItem === 1 ? <Description /> :
            ActivarItem === 2 ? <SelectOprion /> : null}
      </div>

      <div className='flex justify-between mt-10 mx-4'>
        <Button disabled={ActivarItem === 0} variant='outline' onClick={() => setActivarItem(ActivarItem - 1)}>Regresar</Button>
        {ActivarItem < 2 && (
          <Button
            disabled={ChekedStatus()}
            onClick={() => setActivarItem(ActivarItem + 1)}
            className='dark:text-white'
          >
            Siguiente
          </Button>)}
        {ActivarItem === 2 && (<Button
          onClick={() => handlerGenerarCurso()}
          className='dark:text-white'
        >
          Generar Curso
        </Button>)}
      </div>
      <LoadingDialog loading={loading} titulo='por favor espera... Mentorix esta trabajando en tu curso.'/>
    </div>
  );
}

export default Page;
