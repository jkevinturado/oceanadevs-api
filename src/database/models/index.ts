import { Sequelize } from 'sequelize';
import { SERVER_ENV } from '../../utils/config';

import database from '../../helpers/database';
import users from './users';

users.build();

const db = {
  Sequelize: Sequelize,
  sequelize: database,
};

// db.Sequelize.ini;

const dbInit = async (): Promise<void> => {
  try {
    const isDev = SERVER_ENV === 'development' || SERVER_ENV === 'local';
    await db.sequelize.sync({ alter: isDev });

    console.log('Database Connected');
  } catch (error) {
    console.log('Error: Database connection: ', error);
  }
};

export default dbInit;
