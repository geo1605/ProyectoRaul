import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.context';
import HomePage from './modules/dashboard/HomePage';
import AuthScreen from './modules/auth/AuthScreen';
import Alumnos from './modules/dashboard/alumnos';
import MainChat from './modules/chat/mainChat';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import ServerError from './components/TestError500';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/server-error" element={<ServerError />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          >
            <Route path="alumnos" element={<Alumnos />} />
            {/* Rutas anidadas para el chat */}
            <Route path="chat" element={<MainChat />} />
          </Route>
           {/* 🛑 RUTA 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;