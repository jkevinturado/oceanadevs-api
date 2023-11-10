import { Router } from 'express';
import {
  login,
  logout,
  getUserSession,
  createPassword,
  recoverPassword,
  resetPassword,
} from '../controller/auth';

const authRoute = Router();

authRoute.post('/login', login);
authRoute.put('/logout/:id', logout);
authRoute.get('/usersession/:token', getUserSession);
authRoute.post('/createpassword/:username', createPassword);
authRoute.post('/changepassword/:username', createPassword);
authRoute.get('/recoverpassword', recoverPassword);
authRoute.post('/resetpassword/:token', resetPassword);

export default authRoute;
