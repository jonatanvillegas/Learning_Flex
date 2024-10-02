import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que el path es correcto y prisma está configurado

// Manejar la solicitud GET
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'El ID del usuario es requerido.' }, { status: 400 });
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        userId: userId,
      },
      include: {
        Chapters: true,
      },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los cursos.' }, { status: 500 });
  }
}
