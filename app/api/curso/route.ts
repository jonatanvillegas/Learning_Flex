// app/api/cursos/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de tener la configuración de Prisma
import { NextRequest } from 'next/server';
import supabase from '@/lib/supabase'; // Importa tu cliente de Supabase
import { Capitulo, CourseIA } from '@/types';
import { File } from 'buffer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const courseData = formData.get('course');
    const imageFile = formData.get('imageFile');
    const userIdValue = formData.get('userId');
    // Validar que los datos esenciales estén presentes
    if (!imageFile || !courseData || !userIdValue) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos (imagen, curso o userId)' },
        { status: 400 }
      );
    }
    // Parsear `courseData` de string a objeto
    const parsedCourseData:CourseIA = JSON.parse(courseData as string);
    const userId = typeof userIdValue === 'string' ? userIdValue : undefined;
    // Asegurarse de que `imageFile` es de tipo `File`
    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: 'El archivo proporcionado no es válido' },
        { status: 400 }
      );
    }
    const { publicURL } = await uploadImage(imageFile)

    if (userId === undefined) {
      throw new Error("userId es requerido y debe ser un string.");
    }
    // Guardar el curso en la base de datos
    const nuevoCurso = await prisma.course.create({
      data: {
        name: parsedCourseData.nombre,
        image: publicURL,
        category: parsedCourseData.categoria,
        level: parsedCourseData.dificultad,
        duration: parsedCourseData.duracion,
        numCapitulos: String(parsedCourseData.numCapitulos),
        userId: userId,
        Chapters: {
          create: parsedCourseData.capitulos.map((capitulo:Capitulo) => ({
            videoId: capitulo.videoId  || '', // Asegúrate de tener el videoId ya disponible
            name: capitulo.nombre,
            description: capitulo.descripcion,
            duration: capitulo.duracion,
          })),
        },
      },
      select: { id: true }, 
    });

    return NextResponse.json(
      { message: 'Curso guardado exitosamente',nuevoCurso},
      { status: 200 }
    );
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
