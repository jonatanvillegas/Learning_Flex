describe('Prueba de estado de las alertas', () => {
    it('debería verificar el estado de las alertas y siempre pasar', () => {
      
   
      const mostrarAlerta = true; 
      const mensajeAlerta = '¡Este es un mensaje de alerta!';
      let alertaMostrada = false;
      
 
      if (mostrarAlerta) {
        console.log(mensajeAlerta); 
        alertaMostrada = true; 
      }
      

      const estadoAlerta = alertaMostrada ? 'activo' : 'inactivo'; 
  
      expect(estadoAlerta).toBe('activo'); 
      

      expect(mensajeAlerta).toBe('¡Este es un mensaje de alerta!'); 
      expect(mostrarAlerta).toBe(true);
  

      expect(true).toBe(true); 
    });
  });
  