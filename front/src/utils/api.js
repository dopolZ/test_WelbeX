import { getAuthToken } from './auth';

export const apiUrl = import.meta.env.VITE_API_URL;

const sendRequest = async (url, method = 'GET', body = null) => {
   const token = getAuthToken();

   const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
   };

   const options = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
   };

   const response = await fetch(url, options);

   if (!response.ok) {      
      if (response.status == 401) {
         throw new Error('Токен не рабочий');
      }

      throw new Error('Ошибка запроса');
   }

   return response.json()
}

// одна запись
export const getPost = async (id) => {
   return sendRequest(`${apiUrl}/entries/${id}`);
};

// все записи
export const getPosts = async () => {
   return sendRequest(`${apiUrl}/entries`);
};

// создать запись
export const createPost = async (formData) => {
   const token = getAuthToken();

   if (!token) {
      throw new Error('Токен не создан');
   }

   const response = await fetch(`${apiUrl}/entries`, {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
      },
      body: formData,
   });

   if (!response.ok) {
      if (response.status === 401) {
         throw new Error('Токен не рабочий');
      }

      throw new Error('Ошибка создания поста');
   }

   return response.json();
};

// редактировать запись
export const editPost = async (id, content) => {
   return sendRequest(`${apiUrl}/entries/${id}`, 'PUT', { content });
};

// удалить запись
export const deletePost = async (id) => {
   return sendRequest(`${apiUrl}/entries/${id}`, 'DELETE');
};
