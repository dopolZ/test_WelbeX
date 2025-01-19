export const setAuthToken = (token) => {
   localStorage.setItem('token', token);
};

export const getAuthToken = () => {
   return localStorage.getItem('token');
};

export const removeAuthToken = () => {
   localStorage.removeItem('token');
};

export const getCurrentUser = () => {
   const token = getAuthToken();

   if (!token) return null;
   
   const payload = JSON.parse(atob(token.split('.')[1])); // декодируем JWT

   return payload;
};
