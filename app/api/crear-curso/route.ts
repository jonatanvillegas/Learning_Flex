// app/api/data/route.ts

import { chatSession } from '@/lib/IA';
import { NextRequest, NextResponse } from 'next/server';
import { Curso } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  try {
    // Leer datos del cuerpo de la solicitud
    const { prompt } = await req.json();

    // Obtener la respuesta del modelo
    const respuesta = await chatSession.sendMessage(prompt);

    // Convertir la respuesta en texto JSON sin los caracteres de escape
    const jsonResponse = JSON.parse(respuesta.response.text().replace(/\\/g, ''));

    const course: Curso = jsonResponse.curso
    //obteniendo el id del usuario por la autenticacion
    const { userId } = auth()
    // Verificar si el userId es null
    if (!userId) {
      return NextResponse.json(
        {
          message: 'Usuario no autenticado',
        },
        { status: 401 } // Unauthorized
      );
    }

    console.log("funciono")
    // Responder con el JSON sin caracteres de escape
    return NextResponse.json({
      course: {
        course,
        userId,
        idCourse: uuidv4()
      }
    });

  } catch (error) {
    // Manejo de errores
    return NextResponse.json(
      {
        message: 'Ocurrió un error al procesar la solicitud',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
