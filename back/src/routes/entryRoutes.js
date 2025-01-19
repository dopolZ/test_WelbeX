import express from 'express';
import { uploadSingle } from '../middleware/upload.js'
import { authenticateToken } from '../middleware/auth.js'
import {
   getEntries,
   getEntry,
   createEntry,
   updateEntry,
   deleteEntry
} from '../controllers/entryController.js';

const router = express.Router();

/**
 * @swagger
 * /entries:
 *   get:
 *     summary: Получение списка записей
 *     description: Возвращает все записи блога
 *     responses:
 *       200:
 *         description: Список записей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID записи
 *                   content:
 *                     type: string
 *                     description: Содержимое записи
 *                   mediaUrl:
 *                     type: string
 *                     description: URL медиафайла, если существует
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID пользователя
 *                       name:
 *                         type: string
 *                         description: Имя пользователя
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
router.get('/', getEntries);

/**
 * @swagger
 * /entries/{id}:
 *   get:
 *     summary: Получение одной записи
 *     description: Возвращает запись по переданному ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID записи, которую нужно получить
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Запись с указанным ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID записи
 *                 content:
 *                   type: string
 *                   description: Содержимое записи
 *                 mediaUrl:
 *                   type: string
 *                   description: URL медиафайла, если существует
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID пользователя
 *                     name:
 *                       type: string
 *                       description: Имя пользователя
 *       404:
 *         description: Запись не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запись не найдена"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
router.get('/:id', getEntry);

/**
 * @swagger
 * /entries:
 *   post:
 *     summary: Создание новой записи
 *     description: Создает запись с содержимым и медиафайлом (если есть)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Содержимое записи
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Медиафайл, прикрепленный к записи (если есть)
 *     responses:
 *       201:
 *         description: Созданная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID записи
 *                 content:
 *                   type: string
 *                   description: Содержимое записи
 *                 mediaUrl:
 *                   type: string
 *                   description: URL медиафайла, если прикреплен
 *                 userId:
 *                   type: integer
 *                   description: ID пользователя
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Пользователь не найден"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
router.post('/', authenticateToken, uploadSingle, createEntry);

/**
 * @swagger
 * /entries/{id}:
 *   put:
 *     summary: Редактирование записи
 *     description: Редактирует запись на основе переданного ID. Только для автора.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID записи
 *         schema:
 *           type: string
 *       - in: body
 *         name: content
 *         description: Новое содержимое записи
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Новое содержимое записи
 *     responses:
 *       200:
 *         description: Обновленная запись
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запись обновлена"
 *                 entry:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID записи
 *                     content:
 *                       type: string
 *                       description: Обновленное содержимое записи
 *       404:
 *         description: Запись не найдена или чужая
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запись не найдена или чужая"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
router.put('/:id', authenticateToken, updateEntry);

/**
 * @swagger
 * /entries/{id}:
 *   delete:
 *     summary: Удаление записи
 *     description: Удаляет запись с указанным ID и медиафайл, если есть. Только для автора.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID записи
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Сообщение об успехе
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запись удалена"
 *       404:
 *         description: Запись не найдена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Запись не найдена"
 *       500:
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка сервера"
 */
router.delete('/:id', authenticateToken, deleteEntry);

export default router;
