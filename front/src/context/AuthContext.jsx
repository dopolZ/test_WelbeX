import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [userId, setUserId] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
         try {
            const decoded = jwtDecode(token);

            setIsAuthenticated(true);
            setUserId(decoded.id);

         } catch (error) {
            console.error('Токен не рабочий:', error);

            setIsAuthenticated(false);
            setUserId(null);
         }
      }
   }, []);

   const login = (token) => {
      localStorage.setItem('token', token);

      const decoded = jwtDecode(token);

      setIsAuthenticated(true);
      setUserId(decoded.id);
   };

   const logout = () => {
      localStorage.removeItem('token');
      
      setIsAuthenticated(false);
      setUserId(null);
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
