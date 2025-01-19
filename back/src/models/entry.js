import { DataTypes } from 'sequelize';

export default (sequelize) => {
   return sequelize.define('Entry', {
      userId: {
         type: DataTypes.INTEGER,
         references: {
            model: 'Users',
            key: 'id',
         },
         allowNull: false,
      },
      content: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      mediaUrl: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      edit: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      date: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW,
      },
   });
};
