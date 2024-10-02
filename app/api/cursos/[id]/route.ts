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
