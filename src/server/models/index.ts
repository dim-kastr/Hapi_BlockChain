import { Sequelize, } from 'sequelize-typescript';
import config from '../config/config';

const sequelize = new Sequelize(config.dbLink, {
  dialect: 'postgres',
  models: [],
});
sequelize.sync();
export default sequelize;
