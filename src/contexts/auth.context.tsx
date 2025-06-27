import { createContext, useState, useContext, useCallback, useMemo } from 'react';

interface User {
  matricula: string;
  names: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Verificación más segura del estado inicial
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!token && !!user; // Solo true si ambos existen
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null; // Parse seguro
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); // Limpia datos corruptos
      return null;
    }
  });

  const login = useCallback((userData: { token: string; user: User }) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    logout
  }), [isAuthenticated, user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};