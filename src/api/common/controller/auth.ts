import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Op } from 'sequelize';

import { CONFIG_JWT } from '../../../utils/config';
import BadRequestError from '../../../helpers/errors/BadRequestError';
import users, { UserCreationAttributes } from '../../../database/models/users';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password: passwordField } = req.body;
    //function for validation

    console.log(username, passwordField);
    const user = await users.findOne({
      raw: true,
      attributes: [
        'id',
        'email',
        'username',
        'password',
        'firstname',
        'lastname',
        'type',
        'isActive',
      ],
      where: { username, isActive: true },
    });
    console.log(user);
    if (!user)
      throw new BadRequestError({
        code: 404,
        message: 'User not found',
        logging: true,
      });

    console.log(user.password, await bcrypt.hash(passwordField, 12));
    const passwordConfirm = await bcrypt.compare(passwordField, user.password);
    if (!passwordConfirm)
      throw new BadRequestError({
        code: 404,
        message: 'User not found, Incorrect password',
        logging: true,
      });

    let token = jwt.sign(
      { email: username, userId: user.id },
      CONFIG_JWT.secret,
      CONFIG_JWT.option
    );

    const token_expiration = moment()
      .add(CONFIG_JWT.expiration / 60, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss');

    await users.update(
      {
        token,
        token_expiration: new Date(token_expiration),
        lastlogined: new Date(),
      },
      { where: { id: user.id } }
    );

    res.status(200).json({ id: user.id, token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await users.update(
      { token: null, token_expiration: null },
      { where: { id } }
    );

    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

const getUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;

    const user = await users.findOne({
      raw: true,
      attributes: ['id', 'username', 'token_expiration', 'lastlogined'],
      where: {
        token,
        token_expiration: {
          [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    });

    console.log(user);

    if (!user)
      throw new BadRequestError({
        code: 401,
        message: 'User session expired',
        logging: true,
      });

    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

const createPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verify the userid if existing and get user info

    //create the token and update the user token database

    //send email with link and token for reset password

    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //verify if the token is correct and reset the password
    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};

export {
  login,
  logout,
  getUserSession,
  createPassword,
  recoverPassword,
  resetPassword,
};
