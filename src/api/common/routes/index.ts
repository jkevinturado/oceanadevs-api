import { Router } from 'express';
import authenticationRoutes from './auth';
import userRoutes from './user';

const commonRoutes = Router();

commonRoutes.use('/auth', authenticationRoutes);
commonRoutes.use('/user', userRoutes);

export default commonRoutes;
