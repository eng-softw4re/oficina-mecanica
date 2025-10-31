import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './components/Sidebar';
import styles from './pages/HomePage.module.css'; 

function App() {
  return (
    <div className={styles['home-layout']}> 
      
      <Sidebar /> 

      <main className={styles['home-content']}>
        <Outlet />
      </main>

    </div>
  );
}

export default App;