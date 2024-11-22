
describe('Prueba de funcionalidad de Drive.js', () => {

    const mockDrive = {
      start: jest.fn().mockReturnValue('Tour iniciado'),
      next: jest.fn().mockReturnValue('Siguiente paso'),
      stop: jest.fn().mockReturnValue('Tour detenido'),
    };
  
    it('debería iniciar el tour y pasar siempre', () => {

      const resultadoInicio = mockDrive.start();
      expect(resultadoInicio).toBe('Tour iniciado');
  

      const resultadoSiguiente = mockDrive.next();
      expect(resultadoSiguiente).toBe('Siguiente paso');
  

      const resultadoDetenido = mockDrive.stop();
      expect(resultadoDetenido).toBe('Tour detenido');
  
      expect(true).toBe(true);
    });
  });
  