import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ClientesPage from '../pages/ClientesPage';
import ClientePage from '../pages/ClientePage';
import ProcedimentosPage from '../pages/ProcedimentosPage.jsx';
import ProcedimentoPage from '../pages/ProcedimentoPage.jsx';
import InsumosPage from '../pages/InsumosPage.jsx'
import VeiculoPage from '../pages/VeiculoPage.jsx';
import ClienteCreatePage from '../pages/CreateCliente.jsx';

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
        path: 'insumos',
        element: <InsumosPage /> 
      },
      { 
        path: 'insumos/:id',
        element: <InsumosPage /> 
      },
      { 
        path: 'veiculos/:id',
        element: <VeiculoPage /> 
      },
      { 
        path: 'clientes/create',
        element: <ClienteCreatePage /> 
      }
    ]
  }
]);

export default router;