// app/__tests__/MobileCompatibility.test.tsx

import { render } from '@testing-library/react';
import React from 'react';

// Componente simulado que se comporta de manera diferente en dispositivos móviles
const ResponsiveComponent = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div>
      {isMobile ? (
        <h1>Versión Móvil</h1>
      ) : (
        <h1>Versión Escritorio</h1>
      )}
    </div>
  );
};

describe('Prueba de compatibilidad con dispositivos móviles', () => {
  it('debería mostrar la versión móvil cuando isMobile es true', () => {
    // Renderizar el componente simulando que es un dispositivo móvil
    const { getByText } = render(<ResponsiveComponent isMobile={true} />);
    
    // Verificar que la versión móvil se está mostrando
    expect(getByText('Versión Móvil')).toBeInTheDocument();
  });

  it('debería mostrar la versión de escritorio cuando isMobile es false', () => {
    // Renderizar el componente simulando que es un dispositivo de escritorio
    const { getByText } = render(<ResponsiveComponent isMobile={false} />);
    
    // Verificar que la versión de escritorio se está mostrando
    expect(getByText('Versión Escritorio')).toBeInTheDocument();
  });
});
