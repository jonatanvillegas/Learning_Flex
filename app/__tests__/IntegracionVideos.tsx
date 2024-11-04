// app/__tests__/SearchYoutube.test.ts

import { ObtenerVideoYoutube } from '@/lib/SearchYoutube';
import axios from 'axios';

// Mock de la librería axios
jest.mock('axios');

describe('ObtenerVideoYoutube', () => {
  it('debería devolver un video simulado para una consulta', async () => {
    // Simular respuesta de axios
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        items: [
          {
            id: {
              videoId: 'mock-video-id'
            },
            snippet: {
              title: 'Título del Video Simulado',
              description: 'Descripción del Video Simulado',
              thumbnails: {
                default: {
                  url: 'https://example.com/mock-thumbnail.jpg',
                }
              }
            }
          }
        ]
      }
    });

    const query = 'consulta de prueba';
    const result = await ObtenerVideoYoutube(query);

    // Afirmaciones para asegurar que la prueba pase
    expect(result).toEqual({
      items: [
        {
          id: {
            videoId: 'mock-video-id'
          },
          snippet: {
            title: 'Título del Video Simulado',
            description: 'Descripción del Video Simulado',
            thumbnails: {
              default: {
                url: 'https://example.com/mock-thumbnail.jpg',
              }
            }
          }
        }
      ]
    });
  });
});
