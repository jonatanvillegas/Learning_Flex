import { chatSessionInfo } from '@/lib/IA';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Log para verificar los datos entrantes
    const requestBody = await req.json();
    console.log('Datos recibidos:', requestBody);

    // Asegúrate de que 'currentChapter' esté en el cuerpo de la solicitud
    if (!requestBody || !requestBody.currentChapter) {
      throw new Error('currentChapter no se encontró en el cuerpo de la solicitud');
    }

    const { currentChapter } = requestBody;
    console.log('currentChapter:', currentChapter);

    // Llamada al servicio y log de la respuesta
    console.log('Enviando mensaje a chatSessionInfo...');
    const respuesta = await chatSessionInfo.sendMessage(currentChapter);
    console.log('Respuesta del servicio:', respuesta);

    // Verificación de la respuesta y eliminación de los caracteres innecesarios
    // Aquí asumimos que la respuesta es un texto plano, no un objeto JSON
    const cleanedResponseText = respuesta.response.text().replace(/\\/g, ''); 
    console.log('Texto limpio de la respuesta:', cleanedResponseText);

    // Si la respuesta es texto plano, no es necesario usar JSON.parse
    return NextResponse.json({
      info: cleanedResponseText
    });

  } catch (error) {
    // Manejo de errores detallado
    console.error('Error en la solicitud:', error);
    return NextResponse.json(
      {
        message: 'Ocurrió un error al procesar la solicitud',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
