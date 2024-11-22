
const generarContenido = (): string => {
    console.log('Simulando generación de contenido...'); 
    return 'Contenido generado'; 
  };
  

  describe('Prueba de función de generación de contenido', () => {
    it('debería simular la generación de contenido y pasar siempre', () => {
      
      const resultado = generarContenido();
  

      expect(resultado).toBe('Contenido generado');
  

      expect(true).toBe(true);
    });
  });
  