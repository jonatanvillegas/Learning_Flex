import { NextResponse } from 'next/server';

const simulateCourseCreation = async (formData: FormData) => {

  await new Promise((resolve) => setTimeout(resolve, 100));

  // Retornando un objeto simulado como si fuera la respuesta del API
  return {
    message: 'Curso guardado exitosamente',
    nuevoCurso: {
      id: 'mock-course-id',
      name: formData.get('course'),
      image: 'mock-image-url',
    },
  };
};

describe('Simulación de comportamiento del API', () => {
  it('debería simular la creación de un curso exitosamente', async () => {

    const formData = new FormData();
    formData.append('course', JSON.stringify({
      nombre: 'Curso Simulado',
      categoria: 'Desarrollo',
      dificultad: 'Intermedio',
      duracion: '10 horas',
      numeroCapitulos: 5,
      capitulos: [],
    }));
    formData.append('imageFile', new Blob(['mock-image-content'], { type: 'image/png' }));
    formData.append('userId', 'mock-user-id');

 
    const response = await simulateCourseCreation(formData);


    expect(response).toBeDefined();
    expect(response.message).toBe('Curso guardado exitosamente');
    expect(response.nuevoCurso.id).toBe('mock-course-id');
    expect(response.nuevoCurso.image).toBe('mock-image-url');
  });
});
