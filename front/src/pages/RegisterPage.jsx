import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/api';

const RegisterPage = () => {
   const [formData, setFormData] = useState({ name: '', password: '' });
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);
   const navigate = useNavigate();
   const { login } = useAuth();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const validateName = (name) => {
      return name.length >= 5;
   };

   const validatePassword = (password) => {
      return password.length >= 5;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess(false);

      if (!validateName(formData.name)) {
         setError('Имя не менее 5 символов');

         return;
      }

      if (!validatePassword(formData.password)) {
         setError('Пароль не менее 5 символов');

         return;
      }

      try {
         const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (!response.ok) {
            throw new Error(data.message || 'Ошибка регистрации');
         }

         localStorage.setItem('token', data.token);
         login(data.token);
         setSuccess(true);
         setTimeout(() => navigate('/'), 2000);

      } catch (err) {
         setError(err.message);
      }
   };

   return (
      <Box
         component="form"
         onSubmit={handleSubmit}
         sx={{ maxWidth: 400, margin: '0 auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
         <Typography variant="h5" textAlign="center">
            Регистрация
         </Typography>

         {error && <Alert severity="error">{error}</Alert>}
         {success && <Alert severity="success">Всё получилось!</Alert>}

         <TextField
            label="Имя"
            name="name"
            value={formData.name}
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
            Зарегистрироваться
         </Button>
      </Box>
   );
};

export default RegisterPage;
