import React from 'react';
import { Link } from 'react-router-dom';

// --- Definindo os estilos como objetos JavaScript ---

const sidebarStyles = {
  width: '250px', // Largura fixa (w-64)
  minHeight: '100vh', // Altura mínima da tela (min-h-screen)
  backgroundColor: '#2d3748', // Cor de fundo (bg-gray-800)
  color: 'white', // Cor do texto (text-white)
  padding: '16px', // Espaçamento interno (p-4)
};

const logoStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px',
};

const navStyles = {
  listStyle: 'none', // Remove as bolinhas da lista
  padding: 0,
  margin: 0,
};

const navItemStyles = {
  marginBottom: '8px', // Espaçamento entre os itens (mb-2)
};

const navLinkStyles = {
  display: 'block', // (block)
  padding: '8px 16px', // (py-2 px-4)
  textDecoration: 'none', // Remove o sublinhado
  color: 'white',
  borderRadius: '4px', // (rounded)
};
// Nota: O efeito 'hover' (mouse por cima) é mais chato de fazer
// com CSS inline, mas isso já deixa 100% funcional.

// --- O componente ---

function Sidebar() {
  return (
    <div style={sidebarStyles}>
      <div style={logoStyles}>Oficina Mecânica</div>
      <nav>
        <ul style={navStyles}>
          <li style={navItemStyles}>
            {/* MUDANÇA 2: Troque 'a' por 'Link' e 'href' por 'to' */}
            <Link to="/" style={navLinkStyles}>
              Dashboard
            </Link>
          </li>
          <li style={navItemStyles}>
            <Link to="/clientes" style={navLinkStyles}>
              Clientes
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;