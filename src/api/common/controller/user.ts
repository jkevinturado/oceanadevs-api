import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { getRandomNumberByLength } from '../../../helpers/common';
import BadRequestError from '../../../helpers/errors/BadRequestError';
import users, { UserCreationAttributes } from '../../../database/models/users';
import { getPagination, getPagingData } from '../../../helpers/pagination';

interface UserInputAttributes {
  id?: string;
  username: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  type: string;
  isActive?: boolean;
  newlyRegistered?: boolean;
  token?: string | null;
  token_expiration?: Date | null;
  resetpwd_token?: string | null;
  resetpwd_token_expiration?: Date | null;
  changepassworddate?: Date | null;
  lastlogined?: Date;
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validation here
    const { username, email, firstname, lastname, type } = req.body;
    const userDetails: UserInputAttributes = {
      username,
      email,
      firstname,
      lastname,
      type: type || 'USER',
    };

    const password = `${firstname.trim().toLowerCase().slice(0, 2)}${lastname
      .trim()
      .toLowerCase()
      .slice(0, 2)}${getRandomNumberByLength(9999)}`;
    const existingUser = await users.findOne({ where: { username } });

    const hashPwd = await bcrypt.hash(password, 12);
    if (existingUser) {
      throw new BadRequestError({
        code: 409,
        message: 'Username already exists',
        logging: true,
      });
    }

    const userData = { ...userDetails, password: hashPwd };
    console.log(userData);
    await users.create(userData);
    res.status(201).json({ status: true, user: { ...userData, password } });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await users.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await users.update(data, { where: { id } });

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, rowsperpage } = req.params;
    const pageInt = parseInt(page);
    const rowsperpageInt = parseInt(rowsperpage);
    const { limit, offset } = getPagination(pageInt, rowsperpageInt);

    const usersData = await users.findAndCountAll({
      raw: true,
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    //sequelize must be findAndCountAll
    const data = getPagingData(usersData, pageInt, rowsperpageInt);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { createUser, getUserById, getAllUser, updateUser };
