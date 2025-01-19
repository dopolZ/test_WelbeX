import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';

const Header = () => {
   const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      logout(); // выход из контекста
      navigate('/');
   };

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token && !isAuthenticated) {
         // обновить состояние для синхронизации
         setIsAuthenticated(true);
      }
   }, [isAuthenticated]);

   return (
      <AppBar position="sticky" sx={{ backgroundColor: '#1976d2', borderRadius: '.5vw', top: '10px' }}>
         <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
               variant="h6"
               sx={{ cursor: 'pointer', fontWeight: 'bold' }}
               onClick={() => navigate('/')}
            >
               Специально для WelbeX
            </Typography>

            <Box>
               {isAuthenticated
                  ? (
                     <Button color="inherit" onClick={handleLogout}>
                        Выйти
                     </Button>
                  )
                  : (
                     <>
                        <Button
                           color="inherit"
                           sx={{ marginRight: 1 }}
                           onClick={() => navigate('/login')}
                        >
                           Логин
                        </Button>

                        <Button
                           color="inherit"
                           variant="outlined"
                           onClick={() => navigate('/register')}
                        >
                           Регистрация
                        </Button>
                     </>
                  )
               }
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default Header;
