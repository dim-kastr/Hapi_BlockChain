import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { Transaction } from './Transactions';
import { User } from './User';
import { Wallet } from './Wallet';


export const dbInit = async () => {
  const sequelize = new Sequelize(config.dbLink, {
    dialect: 'postgres',
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true
    },
    models: [User, Wallet, Transaction],
    define: {
      freezeTableName: true
    },
    logging: false
  });
  await sequelize.sync();
}