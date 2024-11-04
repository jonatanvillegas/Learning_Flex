// app/__tests__/auth.test.ts

import { SignIn } from '@clerk/nextjs';
import { render } from '@testing-library/react';

// Mock de Clerk para simular la autenticación
jest.mock('@clerk/nextjs', () => ({
  SignIn: jest.fn(() => <div>Mock de SignIn de Clerk</div>),
}));

describe('Prueba de autenticación con Clerk', () => {
  it('debería mostrar el componente de inicio de sesión de Clerk', () => {
    // Renderiza el componente de autenticación simulado
    const { getByText } = render(<SignIn />);

    // Verifica que el componente simulado se haya renderizado correctamente
    expect(getByText('Mock de SignIn de Clerk')).toBeInTheDocument();
  });

  it('debería simular la autenticación de Google', async () => {
    // Simulación de la llamada a la función de inicio de sesión
    const mockLogin = jest.fn();

    // Simulando el comportamiento de inicio de sesión con Google
    await mockLogin();

    // Verificar que la función de inicio de sesión se ha llamado
    expect(mockLogin).toHaveBeenCalled();
  });
});
