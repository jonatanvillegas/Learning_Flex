// lib/SearchYoutube.ts

import axios from 'axios';
import { YouTubeResponse } from '@/types'; // Ajusta la ruta según la ubicación del archivo

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const ObtenerVideoYoutube = async (query: string): Promise<YouTubeResponse> => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
  };
  const { data } = await axios.get(YOUTUBE_BASE_URL, { params });
  return data as YouTubeResponse; // Asume el tipo YouTubeResponse para la respuesta
};
