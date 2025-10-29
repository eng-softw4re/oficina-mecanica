import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import HomePage from '../pages/HomePage';
import ClientesPage from '../pages/ClientesPage';
import ClientePage from '../pages/ClientePage';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path:  '/',
    element: <ProtectedRoutes />,
    children: [ // rotas acessíveis para usuários logados.
      { path: '/home', element: <HomePage /> },
      { path: '/clientes', element: <ClientesPage /> },
      { path: '/clientes/:id', element: <ClientePage />}
    ]
  }
])

export default router;