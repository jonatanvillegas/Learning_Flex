
describe('Simulación de comportamiento del API', () => {
    it('debería simular la creación de un curso exitosamente', async () => {
      
      const simulateApiCall = async (input: { prompt: string }) => {
        
        await new Promise((resolve) => setTimeout(resolve, 100)); 
        
        // Retornando un objeto simulado como si fuera la respuesta del API
        return {
          course: {
            nombre: 'Curso Simulado',
            userId: 'mock-user-id',
            idCourse: 'mock-uuid',
          },
        };
      };
  
      // Simular entrada
      const input = { prompt: 'Crear un curso sobre simulación' };
  
      // Llamar a la función simulada
      const response = await simulateApiCall(input);
  
      // Verificación de la respuesta simulada
      expect(response).toBeDefined();
      expect(response.course.nombre).toBe('Curso Simulado');
      expect(response.course.userId).toBe('mock-user-id');
      expect(response.course.idCourse).toBe('mock-uuid');
    });
  });
  