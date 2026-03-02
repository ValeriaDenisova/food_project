import React, { useState } from 'react';
import type { ReactNode } from 'react';
import  {AuthContext} from 'hooks/useAuth/useAuth';

export interface AuthContextProps {
  token: string | null | undefined;
  setToken: (token: string | null) => void;
  username: string | null | undefined;
  setUsername: (username: string | null) => void;
}



export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>(() => localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null | undefined>(() => localStorage.getItem('username'));

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };

  const updateUsername = (newUsername: string | null) => {
    if (newUsername) {
      localStorage.setItem('username', newUsername);
    } else {
      localStorage.removeItem('username');
    }
    setUsername(newUsername);
  };

  return (
    <AuthContext.Provider value={{
      token,
      setToken: updateToken,
      username,
      setUsername: updateUsername
    }}>
      {children}
    </AuthContext.Provider>
  );
};


