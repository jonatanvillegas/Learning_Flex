"use client";
import React, { useEffect, useState } from 'react';
import InformationBasic from './_components/InformationBasic';
import DetailCourse from './_components/DetailCourse';
import ListChapter from './_components/ListChapter';


import { useRouter } from 'next/navigation';
import { useCourse } from '@/app/_store/curso';


const Page = () => {
  const router = useRouter();
  const { Course } = useCourse();
  const course = Course?.course;
  const userId = Course?.userId || "";
  // Estado para manejar la hidratación
  const [isHydrated, setIsHydrated] = useState(false);

  // Efecto para asegurarse de que el componente esté montado
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Efecto para redirigir si no hay curso después de la hidratación
  useEffect(() => {
    if (isHydrated && !course) {
      router.replace("/dashboard");
    }
  }, [course, isHydrated, router]);

  // Si no está hidratado, muestra un cargando o un placeholder
  if (!isHydrated) {
    return <div className='flex justify-center items-center font-bold text-2xl'>Cargando...</div>;
  }

  return (
    <>
      {course ? (
        <div className='mt-10 px-7 md:px-20 lg:px-44'>
          <h2 className='font-bold text-center text-2xl'>
            Estructura 
          </h2>
          {/* Información del curso */}
          <InformationBasic course={course} userId={userId}/>
          {/* Detalle del curso */}
          <DetailCourse course={course} />
          {/* Capítulos del curso */}
          <h2 className='font-semibold text-2xl mt-3'>Capitulos</h2>
          {
            course.capitulos.map((capitulo,index) => (
              <ListChapter capitulo={capitulo} key={index} index={index} />
            ))
          }
        </div>
      ) : (
        <div className='flex justify-center items-center font-bold text-2xl'>Cargando...</div>
      )}
    </>
  );
};

export default Page;
