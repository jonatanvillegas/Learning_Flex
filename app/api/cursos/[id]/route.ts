import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const courseId = parseInt(params.id)

  try {
    // Eliminar todos los capítulos asociados al curso
    await prisma.chapter.deleteMany({
      where: { courseId: courseId },
    })

    // Eliminar el curso
    await prisma.course.delete({
      where: { id: courseId },
    })

    return NextResponse.json({ message: 'Curso y capítulos eliminados correctamente.' }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar el curso y sus capítulos:', error)
    return NextResponse.json({ error: 'Error al eliminar el curso y sus capítulos.' }, { status: 500 })
  }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const courseId = parseInt(params.id); // Asegúrate de que lo conviertes a un número

    console.log('contenido del id',courseId)
    if (isNaN(courseId)) {
      throw new Error('El id proporcionado no es válido');
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { Chapters: true },
    });

    if (!course) {
      return new Response('Curso no encontrado', { status: 404 });
    }
    console.log('desde el enpoint',course)
    return NextResponse.json(course, { status: 200 })
  } catch (error) {
    console.error('Error al buscar el curso:', error)
    return NextResponse.json({ error: 'Error al buscar el curso.' }, { status: 500 })
  }

  
}