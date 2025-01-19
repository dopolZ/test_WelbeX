import { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../utils/api';

function CreatePostPage() {
   const [content, setContent] = useState('');
   const [media, setMedia] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState(false);
   const [fileKey, setFileKey] = useState(Date.now());
   const navigate = useNavigate();
   const maxFileSize = 1e7; // 10 MB

   const handleMediaChange = (e) => {
      const file = e.target.files[0];

      if (file && file.size > maxFileSize) {
         setError('Извините, максимум — 10MB');
         setMedia(null);
         setFileKey(Date.now());

         return;
      }

      setMedia(file);
      setError('');
   };

   const handleCreatePost = async () => {
      if (!content && !media) {
         setError('Пусто, нечего отправлять');

         return;
      }

      const formData = new FormData();
      formData.append('content', content);

      if (media) formData.append('media', media);

      setLoading(true);
      setError('');

      try {
         await createPost(formData);
         setSuccess(true);
         setTimeout(() => navigate('/'), 1000);

      } catch (err) {
         console.error('Ошибка создания:', err);

         setError('Что-то пошло не так...');

      } finally {
         setLoading(false);
      }
   };

   return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
         <Typography variant="h4" gutterBottom>
            Создать запись
         </Typography>

         <TextField
            label="Поделитесь мыслями, наверное это очень интересно"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            margin="normal"
         />

         <input
            key={fileKey}
            type="file"
            onChange={handleMediaChange}
            style={{ margin: '16px 0' }}
         />

         <Button
            onClick={handleCreatePost}
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
         >
            {loading ? 'отправка...' : 'Опубликовать'}
         </Button>

         <Snackbar
            open={!!error}
            autoHideDuration={4000}
            onClose={() => setError('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         >
            <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
               {error}
            </Alert>
         </Snackbar>

         <Snackbar
            open={success}
            autoHideDuration={4000}
            onClose={() => setSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
         >
            <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Успешно создан!
            </Alert>
         </Snackbar>
      </Container>
   );
}

export default CreatePostPage;
