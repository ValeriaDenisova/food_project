import { createContext } from 'react';
import { type AuthContextProps } from 'context/AuthContext';
import { useContext } from 'react';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};