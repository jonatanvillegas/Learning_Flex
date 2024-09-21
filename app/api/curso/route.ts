// app/api/cursos/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de tener la configuración de Prisma
import { NextRequest } from 'next/server';
import supabase from '@/lib/supabase'; // Importa tu cliente de Supabase
import { Capitulo } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { course, userId } = await request.json();
    console.log(course)
    // Asumimos que imageFile es un archivo binario, por lo que se tiene que procesar adecuadamente
    const imageData = await uploadImage(course.imageFile);

    // // Guardar el curso en la base de datos
    // const nuevoCurso = await prisma.course.create({
    //   data: {
    //     name: course.nombre,
    //     image: imageData?.publicURL || "",
    //     category: course.categoria,
    //     level: course.Dificultad,
    //     duration: course.duracion,
    //     numCapitulos: String(course.numCapitulos),
    //     userId: userId,
    //     Chapters: {
    //       create: course.capitulos.map((capitulo:Capitulo) => ({
    //         videoId: capitulo.videoId, // Asegúrate de tener el videoId ya disponible
    //         name: capitulo.nombre,
    //         description: capitulo.descripcion,
    //         duration: capitulo.duracion,
    //       })),
    //     },
    //   },
    //   select: { id: true }, 
    // });

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error al guardar el curso:', error);
    return NextResponse.json({ error: 'Error al guardar el curso' }, { status: 500 });
  }
}

async function uploadImage(file: any) {
  if (!file) {
    return { publicURL: "" };
  }

  const {  error } = await supabase.storage.from('Image').upload(`ImageCourse/${file.name}`, file);

  if (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('Error al subir la imagen');
  }

 // Obtener la URL pública del archivo
 const { data } = supabase.storage.from('Image').getPublicUrl(`ImageCourse/${file.name}`);
 const publicURL = data.publicUrl
 
 return { publicURL };
}
