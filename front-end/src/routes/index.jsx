import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import HomePage from '../pages/HomePage';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path:  '/',
    element: <ProtectedRoutes />,
    children: [ // rotas acessíveis para usuários logados.
      {
        path: '/home',
        element: <HomePage />
      }
    ]
  }
])

export default router;