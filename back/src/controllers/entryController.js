import { User, Entry } from '../models/index.js';
import fs from 'fs/promises';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export const getEntries = async (req, res) => {
   try {
      const entries = await Entry.findAll({
         include: [{ model: User, attributes: ['id', 'name'] }]
      });

      res.json(entries);

   } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'Ошибка запроса' });
   }
};

export const getEntry = async (req, res) => {
   try {
      const { id } = req.params;
      const entry = await Entry.findByPk(id);

      if (!entry) {
         return res.status(404).json({ message: 'Запись не найдена' });
      }

      res.json(entry);

   } catch (error) {
      console.error(error);

      res.status(500).json({ message: 'Ошибка запроса' });
   }
};

export const createEntry = async (req, res) => {
   try {
      const { content } = req.body;
      const { id } = req.user;
      const user = await User.findByPk(id);
      let mediaUrl = null;

      if (!user) {
         return res.status(404).json({ message: 'Пользователь не найден' });
      }

      if (req.file) {
         mediaUrl = `/uploads/${req.file.filename}`;
      }

      const entry = await Entry.create({
         content,
         mediaUrl,
         userId: id,
      });

      res.status(201).json(entry);

   } catch (error) {
      console.error('Ошибка записи:', error);

      res.status(500).json({ message: 'Ошибка записи' });
   }
};

export const updateEntry = async (req, res) => {
   try {
      const { id } = req.params;
      const { content } = req.body;

      const entry = await Entry.findOne({
         where: { id, userId: req.user.id }
      });

      if (!entry) {
         return res.status(404).json({ message: 'Запись не найдена' });
      }

      entry.content = content;
      await entry.save();

      res.status(200).json({ message: 'Успешно изменена', entry });

   } catch (error) {
      console.error(error);

      res.status(500).json({ message: 'Ошибка редактирования' });
   }
}

export const deleteEntry = async (req, res) => {
   try {
      const { id } = req.params;
      const entry = await Entry.findOne({
         where: { id, userId: req.user.id }
      });

      if (!entry) {
         return res.status(404).json({ message: 'Запись не найдена' });
      }

      if (entry.mediaUrl) {
         const filePath = path.join(__dirname, '../../uploads', path.basename(entry.mediaUrl));

         try {
            await fs.unlink(filePath);

         } catch (err) {
            console.error(`Ошибка удаления ${filePath}:`, err);
         }
      }

      await entry.destroy();
      res.status(200).json({ message: 'Запись удалена' });

   } catch (error) {
      console.error(error);

      res.status(500).json({ message: 'Ошибка удаления' });
   }
}
