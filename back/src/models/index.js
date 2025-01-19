import { Sequelize } from 'sequelize';
import defineUser from './user.js';
import defineEntry from './entry.js';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
   dialect: 'postgres',
   protocol: 'postgres',
   dialectOptions: {
      ssl: process.env.NODE_ENV === 'production'
         ? { require: true, rejectUnauthorized: false }
         : false,
   },
});

// определение моделей
const User = defineUser(sequelize);
const Entry = defineEntry(sequelize);

// связь между моделями
User.hasMany(Entry, { foreignKey: 'userId' });
Entry.belongsTo(User, { foreignKey: 'userId' });

const connectToDatabase = async () => {
   try {
      await sequelize.authenticate();
      await sequelize.sync(); // создать таблицы

      console.log('Соединение с БД успешно!');
      
   } catch (error) {
      console.error('Соединение с БД ошибка:', error);

      process.exit(1);
   }
};

export { sequelize, User, Entry, connectToDatabase };
