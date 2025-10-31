import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './components/Sidebar';
// 1. Importe os estilos para um objeto 'styles'
import styles from './pages/HomePage.module.css'; 

function App() {
  return (
    // 2. Use o objeto para acessar as classes
    // (use colchetes [] se o nome tiver hífen)
    <div className={styles['home-layout']}> 
      
      <Sidebar /> 

      <main className={styles['home-content']}>
        <Outlet />
      </main>

    </div>
  );
}

export default App;