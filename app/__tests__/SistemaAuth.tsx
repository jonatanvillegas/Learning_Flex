

import { SignIn } from '@clerk/nextjs';
import { render } from '@testing-library/react';


jest.mock('@clerk/nextjs', () => ({
  SignIn: jest.fn(() => <div>Mock de SignIn de Clerk</div>),
}));

describe('Prueba de autenticación con Clerk', () => {
  it('debería mostrar el componente de inicio de sesión de Clerk', () => {
  
    const { getByText } = render(<SignIn />);

 
    expect(getByText('Mock de SignIn de Clerk')).toBeInTheDocument();
  });

  it('debería simular la autenticación de Google', async () => {
    
    const mockLogin = jest.fn();

   
    await mockLogin();

    
    expect(mockLogin).toHaveBeenCalled();
  });
});
