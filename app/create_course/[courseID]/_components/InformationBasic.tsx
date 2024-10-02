'use client'
import { Button } from '@/components/ui/button'
import { Curso, Video, YouTubeResponse } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ObtenerVideoYoutube } from '@/lib/SearchYoutube'
import LoadingDialog from '../../LoadingDialog'
import { useRouter } from 'next/navigation'

type props = {
  course: Curso
  userId: string
}

const InformationBasic = ({ course, userId }: props) => {

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Obtener imagen del usuario
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file.name)
      setSelectedFile(file);
    }
  };
  console.log('probando desde informacion numero',course.numeroCapitulos)


  // const fetchVideosForChapters = async () => {
  //   try {
  //     const videoPromises = course.capitulos.map(async (capitulo) => {
  //       const query = capitulo.descripcion.split('-')[0].trim();
  //       const videos = await ObtenerVideoYoutube(query);
  //       return videos.items.map((video: Video) => video.id.videoId)
  //     });

  //     const videoResults = await Promise.all(videoPromises);
  //     setVideos(videoResults.flat());
  //   } catch (error) {
  //     console.error('Error obteniendo videos de YouTube:', error);
  //   }
  // };
  const generarIdVideoSimulado = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 11; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
  };
  
  // Generar datos de prueba para videos de capítulos
  const fetchVideosForChapters = async () => {
    try {
      // Simular la asignación de IDs a cada capítulo
      const videoResults = course.capitulos.map(() => generarIdVideoSimulado());
      setVideos(videoResults);
    } catch (error) {
      console.error('Error generando videos simulados:', error);
    }
  };
  console.log('Informacion del curso',course)
  const saveCourse = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('imageFile', selectedFile!); // Asegúrate de que `selectedFile` no es null
      formData.append('course', JSON.stringify({
        ...course,
        capitulos: course.capitulos.map((capitulo, index) => ({
          ...capitulo,
          videoId: videos[index],
        })),
      }));
      formData.append('userId', userId); // Cambia esto según el ID del usuario

      console.log("informacion del Form Data")
      const response = await fetch('/api/curso', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setLoading(false)
        console.log('Curso guardado exitosamente:', result);
        router.replace('/dashboard');
      } else {
        console.error('Error al guardar el curso:', result.error);
      }
    } catch (error) {
      console.error('Error al guardar el curso:', error);
    }
  };

  useEffect(() => {
    if (course.capitulos?.length > 0) {
      fetchVideosForChapters();
    }
  }, [course.capitulos]);

  return (
    <div className='p-10 boder rounded-xl shadow-md mt-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div >
          <h2 className='font-bol text-2xl'>{course.titulo}</h2>
          <p className='text-xs text-gray-400 mt-3 truncate'>{course?.descripcion}</p>
          <h2 className='font-medium flex gap-2 items-center mb-5'>{course?.categoria}</h2>
          <Button className='bg-primary w-full' onClick={saveCourse} disabled={!videos?.length}>
            {videos ? "Iniciar" : "Cargando..."}
          </Button>
        </div>
        <div>
          <label htmlFor="upload">
            <Image src={selectedFile ? URL.createObjectURL(selectedFile) : "/placeholder.jpg"}
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
      <LoadingDialog loading={loading} titulo='estamos guardando tu curso espera un momento.'/>
    </div>
  )
}

export default InformationBasic