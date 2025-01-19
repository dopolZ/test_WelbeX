import { User } from '../models/index.js';
import bcrypt from 'crypto';
import jwt from 'jsonwebtoken';

const getToken = (user) => jwt.sign(
   { id: user.id, name: user.name },
   process.env.JWT_SECRET,
   { expiresIn: '1h' }
);

export const login = async (req, res) => {
   try {
      const { name, password } = req.body;
      const user = await User.findOne({ where: { name } });

      if (!user) {
         return res.status(404).json({ message: 'Пользователь не найден' });
      }

      const hashPassword = bcrypt.createHash('sha256')
         .update(password).digest('hex');

      if (user.password !== hashPassword) {
         return res.status(401).json({ message: 'Неверный пароль' });
      }

      res.status(200).json({
         message: 'Успешный вход',
         token: getToken(user)
      });

   } catch (error) {
      console.error('Ошибка входа:', error);

      res.status(500).json({ message: 'Ошибка сервера' });
   }
};

export const register = async (req, res) => {
   try {
      const { name, password } = req.body;
      const existUser = await User.findOne({ where: { name } });

      if (existUser) {
         return res.status(400).json({ message: 'Имя занято' });
      }

      const hashPassword = bcrypt.createHash('sha256')
         .update(password).digest('hex');

      const user = await User.create({ name, password: hashPassword });

      res.status(201).json({
         message: 'Успешная регистрация',
         token: getToken(user)
      });

   } catch (error) {
      console.error('Ошибка регистрации:', error);

      res.status(500).json({ message: 'Ошибка сервера' });
   }
};
