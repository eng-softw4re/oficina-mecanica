import React from 'react';
import Sidebar from '../components/Sidebar';

import styles from './HomePage.module.css'; 

function HomePage() {
  return (
    <div className={styles['home-layout']}> 
      <div className={styles['home-content']}>
        <h1 className={styles['home-title']}>Bem-vindo ao Dashboard</h1>
        
        <p>Hello, você está logado!!</p>
        
        <p className={styles['home-info-text']}>
          Aqui você verá os principais indicadores da oficina.
        </p>
      </div>

    </div>
  );
}

export default HomePage;