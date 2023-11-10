import { Router } from 'express';
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
} from '../controller/user';
const userRoutes = Router();

//get all user
userRoutes.get('/', getAllUser);
//get user by id
userRoutes.get('/:id', getUserById);
//create user
userRoutes.post('/', createUser);
//update user
userRoutes.put('/:id', updateUser);
//delete user
userRoutes.delete('/:id');

export default userRoutes;
