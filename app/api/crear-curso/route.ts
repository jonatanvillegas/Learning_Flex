// app/api/data/route.ts

import { chatSession } from '@/lib/IA';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Leer datos del cuerpo de la solicitud
    const { prompt } = await req.json();

    // Obtener la respuesta del modelo
    const respuesta = await chatSession.sendMessage(prompt);

    // Convertir la respuesta en texto JSON sin los caracteres de escape
    const jsonResponse = JSON.parse(respuesta.response.text().replace(/\\/g, ''));

    // Responder con el JSON sin caracteres de escape
    return NextResponse.json({
       jsonResponse
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
