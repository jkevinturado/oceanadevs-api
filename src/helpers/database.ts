import { Sequelize } from 'sequelize';
import { CONFIG_DB } from '../utils/config';

const db = new Sequelize(CONFIG_DB);
export default db;
