import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';
import { getPosts, deletePost } from '../utils/api';
import { renderMedia, formatContent, formatDate } from '../utils/dpPostContent';

const HomePage = () => {
   const [posts, setPosts] = useState([]);
   const { isAuthenticated, userId } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const postsData = await getPosts();
            setPosts(postsData);

         } catch (error) {
            console.error('Ошибка запроса:', error);
         }
      };

      fetchPosts();
   }, []);

   const handleEditPost = (postId) => {
      navigate(`/edit-post/${postId}`);
   };

   const handleDeletePost = async (postId) => {
      if (window.confirm('Удаляем?')) {
         try {
            await deletePost(postId);
            setPosts(posts.filter(post => post.id !== postId));

         } catch (error) {
            console.error('Ошибка удаления:', error);

            alert('Ошибка удаления, попробуйте ещё раз');
         }
      }
   };

   return (
      <div>
         <h1>Наши соображения ...</h1>

         {isAuthenticated && (
            <Button
               variant="contained"
               color="primary"
               onClick={() => navigate('/create-post')}
               style={{ marginBottom: '20px' }}
            >
               Добавлю пожалуй
            </Button>
         )}

         {posts.length === 0
            ? (<p>Добавьте что-нибудь, пока пусто</p>)
            : (
               <ul>
                  {posts.map((post) => (
                     <li key={post.id}>
                        <h4>{formatDate(post.date)}</h4>
                        <h5>{formatContent(post.content)}</h5>

                        <div style={{ textAlign: 'center' }}>
                           {renderMedia(post.mediaUrl)}
                        </div>

                        <p>автор: {post.User?.name || 'John Doe'}</p>

                        {isAuthenticated && post.userId === userId && (
                           <div>
                              <Button
                                 variant="outlined"
                                 color="primary"
                                 onClick={() => handleEditPost(post.id)}
                                 style={{ marginRight: '10px' }}
                              >
                                 Редактировать
                              </Button>

                              <Button
                                 variant="outlined"
                                 color="secondary"
                                 onClick={() => handleDeletePost(post.id)}
                              >
                                 Удалить
                              </Button>
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
            )
         }
      </div>
   );
};

export default HomePage;
