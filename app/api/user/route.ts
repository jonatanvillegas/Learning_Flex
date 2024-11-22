import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import { clerkClient } from '@clerk/nextjs/server';


export async function GET(req: Request) {
  try {
    console.time('get-users-query');
    
    const users = await prisma.user.findMany();
    
    console.timeEnd('get-users-query');

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al obtener los usuarios.' }, { status: 500 });
  }
}

// Manejar la solicitud DELETE (Eliminar usuario)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Obtener el ID desde el cuerpo de la solicitud

    // Paso 1: Obtener los cursos relacionados con el usuario
    const courses = await prisma.course.findMany({
      where: { userId: id },
    });

    // Paso 2: Eliminar los capítulos relacionados con cada curso
    const chapterDeletions = courses.map((course) =>
      prisma.chapter.deleteMany({
        where: { courseId: course.id },
      })
    );
    await Promise.all(chapterDeletions); // Esperar a que todas las eliminaciones se completen

    // Paso 3: Eliminar los cursos relacionados con el usuario
    await prisma.course.deleteMany({
      where: { userId: id },
    });

    // Paso 4: Eliminar el usuario de Clerk
    await clerkClient.users.deleteUser(id); // Asegúrate de que el ID coincida con el de Clerk

    // Paso 5: Eliminar el usuario de la base de datos
    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Usuario y datos relacionados eliminados correctamente.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al eliminar el usuario o los datos relacionados.' }, { status: 500 });
  }
}

// Manejar la solicitud PATCH para cambiar el estado de "premium"
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID del usuario es requerido' }, { status: 400 });
    }

    // Buscar el usuario por su ID
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Cambiar el estado de "premium"
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        premium: !user.premium,  
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error al cambiar el estado de premium:", error);
    return NextResponse.json({ error: 'Error al cambiar el estado del usuario.' }, { status: 500 });
  }
}
