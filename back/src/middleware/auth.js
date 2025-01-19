import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
      return res.status(401).json({ error: 'Авторизация отклонена' });
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
         return res.status(403).json({ error: 'Токен не рабочий' });
      }

      req.user = user;
      next();
   });
};
