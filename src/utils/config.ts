import * as dotenv from 'dotenv';
import { Dialect, Options } from 'sequelize';
import moment from 'moment';

interface JWTAttributes {
  secret: string;
  option: { expiresIn: number | string };
  expiration: number;
}

dotenv.config();

const SERVER_ENV = process.env.ENV;

const SERVER_PORT = process.env.PORT;
const CONFIG_DB = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialect: process.env.DB_DIALECT as Dialect,
} as Options;

const CONFIG_URLS = {
  frontend: process.env.FRONTEND_URL,
};

const CONFIG_JWT: JWTAttributes = {
  secret: process.env.JWT_SECRET || 'TESTKEY',
  option: { expiresIn: parseInt(process.env.JWT_EXPIRATION || '3600') },
  expiration: parseInt(process.env.JWT_EXPIRATION || '3600') || 3600,
};

export { SERVER_ENV, SERVER_PORT, CONFIG_DB, CONFIG_URLS, CONFIG_JWT };
