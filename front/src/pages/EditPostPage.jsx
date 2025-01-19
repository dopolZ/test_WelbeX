import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, editPost } from '../utils/api';

function EditPostPage() {
   const { id } = useParams();
   const [content, setContent] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      const fetchPost = async () => {
         try {
            const post = await getPost(id);

            if (post) {
               setContent(post.content);
            }

         } catch (error) {
            console.error('Ошибка запроса:', error);

            alert('Запись не найдена');
         }
      };

      fetchPost();
   }, [id]);

   const handleEditPost = async () => {
      try {
         await editPost(id, content);
         navigate('/');

      } catch (error) {
         console.error('Ошибка изменения:', error);

         alert('Ошибка изменения, попробуйте ещё раз');
      }
   };

   return (
      <Container>
         <Typography variant="h4">Редактирование</Typography>

         <TextField
            label="действительно, давайте поменяем"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
         />
         
         <Button onClick={handleEditPost}>ИЗМЕНИТЬ</Button>
      </Container>
   );
}

export default EditPostPage;
