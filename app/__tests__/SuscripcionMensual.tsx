import { render } from "@testing-library/react";

const mockProcessPayment = jest.fn(() => {
    return Promise.resolve({ success: true, transactionId: 'mock-transaction-id' });
  });
  
  const PaymentComponent = () => {
    const handlePayment = async () => {
      const response = await mockProcessPayment();
      return response;
    };
  
    return (
      <button onClick={handlePayment}>Pagar</button>
    );
  };
  
  describe('Prueba de integración simulada con Stripe', () => {
    it('debería simular el proceso de pago', async () => {

      const response = await mockProcessPayment();
  

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.transactionId).toBe('mock-transaction-id');
    });
  
    it('debería renderizar el botón de pago', () => {
      const { getByText } = render(<PaymentComponent />);
  
  
      expect(getByText('Pagar')).toBeInTheDocument();
    });
  });
  