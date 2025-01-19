import { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/api';

const LoginPage = () => {
   const [formData, setFormData] = useState({ username: '', password: '' });
   const [error, setError] = useState('');
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setError('');

      const { username, password } = formData;

      if (!username || !password) {
         setError('Оба поля обязательны для заполнения');

         return;
      }

      try {
         const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, password }),
         });

         if (!response.ok) {
            throw new Error('Неверные учетные данные или ошибка сервера');
         }

         const data = await response.json();
         const token = data.token;

         login(token);
         navigate('/');

      } catch (error) {
         console.error('Ошибка входа:', error);

         setError('Ошибка входа. Проверьте данные');
      }
   };

   return (
      <Box
         component="form"
         onSubmit={handleLogin}
         sx={{ maxWidth: 400, margin: '0 auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
         <Typography variant="h5" textAlign="center">
            Вход
         </Typography>

         {error && <Alert severity="error">{error}</Alert>}

         <TextField
            label="Имя"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
         />

         <TextField
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
         />

         <Button type="submit" variant="contained" color="primary">
            Войти
         </Button>
      </Box>
   );
};

export default LoginPage;
