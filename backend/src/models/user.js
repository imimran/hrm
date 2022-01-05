import Sequelize  from 'sequelize'
import {sequelize}  from './index';

  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.BIGINT(20),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(60),
        allowNull: false,
       
      },
      last_name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    });


export default User;