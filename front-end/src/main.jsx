import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // <-- 1. Importe o Provider
import router from './routes/index.jsx' // <-- 2. Importe seu router
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* 3. Renderize o RouterProvider, NÃO o App */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
