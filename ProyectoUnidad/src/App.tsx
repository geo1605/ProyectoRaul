import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'; // Importamos los componentes de React Router

import HomePage from './dashboard/HomePage';  // Página principal que tendrá rutas anidadas
import AuthScreen from './auth/AuthScreen';
import Alumnos from './dashboard/alumnos';
import MainChat from './chat/mainChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de la página principal con rutas anidadas */}
        <Route path="/" element={<HomePage />}>
          {/* Rutas anidadas dentro de HomePage */}
          <Route path="alumnos" element={<Alumnos />} />
          <Route path="chat" element={<MainChat />} />
        </Route>

        {/* Ruta de la autenticación */}
        <Route path="/auth" element={<AuthScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
