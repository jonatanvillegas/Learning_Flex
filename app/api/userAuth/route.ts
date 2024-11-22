import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Asegúrate de que el path es correcto y prisma está configurado
import { clerkClient } from '@clerk/nextjs/server';


export async function GET(req:NextRequest) {
    try {
      // Obtener el ID del usuario desde los parámetros de consulta
      const { searchParams } = new URL(req.url);
      const clerkId = searchParams.get('id');
  
      if (!clerkId) {
        return NextResponse.json({ error: 'ID de usuario no proporcionado.' }, { status: 400 });
      }
  
      console.time('get-user-query');
  
      // Consulta a Prisma para obtener el usuario basado en el ID de Clerk
      const user = await prisma.user.findUnique({
        where: {
          id: clerkId, // Supone que el campo clerkId existe en la tabla de usuario
        },
      });
  
      console.timeEnd('get-user-query');
  
      if (!user) {
        return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
      }
  
      return NextResponse.json(user, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error al obtener el usuario.' }, { status: 500 });
    }
}