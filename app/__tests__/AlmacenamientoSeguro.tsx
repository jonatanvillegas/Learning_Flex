// app/__tests__/Cursos.test.ts

import { NextResponse } from 'next/server';

// Simulación de la función de creación de curso
const simulateCourseCreation = async (formData: FormData) => {
  // Esperar un breve momento para simular latencia
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
    // Simular la entrada del formulario
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

    // Llamar a la función simulada
    const response = await simulateCourseCreation(formData);

    // Verificación de la respuesta simulada
    expect(response).toBeDefined();
    expect(response.message).toBe('Curso guardado exitosamente');
    expect(response.nuevoCurso.id).toBe('mock-course-id');
    expect(response.nuevoCurso.image).toBe('mock-image-url');
  });
});
