import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path:  '/',
    element: <ProtectedRoutes />,
    children: [ // rotas acessíveis para usuários logados.
    ]
  }
])

export default router;