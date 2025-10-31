import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ClientesPage from '../pages/ClientesPage';
import ClientePage from '../pages/ClientePage';
import ProcedimentosPage from '../pages/ProcedimentosPage.jsx';

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
      }
    ]
  }
]);

export default router;