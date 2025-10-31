import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ClientesPage from '../pages/ClientesPage';
import ClientePage from '../pages/ClientePage';
import ProcedimentosPage from '../pages/ProcedimentosPage.jsx';
import ProcedimentoPage from '../pages/ProcedimentoPage.jsx';
import OrdensPage from '../pages/OrdensPage.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path:  '/',
    element: <App />,
    children: [ 
      { 
        index: true, 
        element: <HomePage /> 
      }, 
      { 
        path: 'clientes',
        element: <ClientesPage /> 
      },
      { 
        path: 'clientes/:id', 
        element: <ClientePage />
      },
      { 
        path: 'procedimentos',
        element: <ProcedimentosPage /> 
      },
      { 
        path: 'procedimentos/:id',
        element: <ProcedimentoPage /> 
      },
      { 
        path: 'ordem-de-servicos',
        element: <OrdensPage /> 
      },
      { 
        path: 'ordem-de-servicos/:id',
        element: <OrdensPage /> 
      }
    ]
  }
]);

export default router;