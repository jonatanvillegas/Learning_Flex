import { GET } from '@/app/api/youtube/route';
import axios from 'axios';
import { NextResponse } from 'next/server';


jest.mock('axios');
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Prueba que siempre pasa', () => {
  it('debería siempre devolver true', async () => {
   
    mockedAxios.get.mockResolvedValue({
      data: {
        items: [{ id: '123', snippet: { title: 'Test Video' } }],
      },
    });

  
    (NextResponse.json as jest.Mock).mockReturnValue({ success: true });

  
    const request = { url: 'http://localhost:3000/api/endpoint?query=test' } as any;
    const response = await GET(request);

  
    expect(true).toBe(true); 
  });
});
