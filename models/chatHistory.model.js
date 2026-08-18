const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatHistory = sequelize.define(
  'ChatHistory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'chat_histories',
    timestamps: true,
  }
);

module.exports = ChatHistory;
