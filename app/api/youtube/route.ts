import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query'); // Obtenemos el parámetro 'query' de la URL

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro query' }, { status: 400 });
  }

  try {
    const { data } = await axios.get(YOUTUBE_BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        maxResults: 1,
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        type: 'video'
      },
    });

    return NextResponse.json(data.items, { status: 200 });
  } catch (error) {
    console.error('Error al obtener videos de YouTube:', error);
    return NextResponse.json({ error: 'Error al obtener videos de YouTube' }, { status: 500 });
  }
}
