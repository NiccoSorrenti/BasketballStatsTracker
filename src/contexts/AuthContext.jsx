import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // login
  const login = async (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // fetch user (/me)
  const fetchUser = async (jwt) => {
    try {
      const res = await axios.get('http://localhost:8080/users/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.error('Errore fetch user', err);
      logout();
    }
  };

  // auto-login su refresh
  useEffect(() => {
    const init = async () => {
      if (token) {
        await fetchUser(token);
      }
      setLoading(false);
    };

    init();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
