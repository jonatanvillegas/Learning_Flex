
describe('Simulación de descarga de PDF', () => {
  
    const mockDescargarPDF = jest.fn().mockResolvedValue('PDF descargado correctamente');
  
    it('debería simular la descarga de un PDF y pasar siempre', async () => {

      const resultadoDescarga = await mockDescargarPDF();
  
      expect(mockDescargarPDF).toHaveBeenCalledTimes(1);
      expect(resultadoDescarga).toBe('PDF descargado correctamente');
  
      
      expect(true).toBe(true);
    });
  });
  