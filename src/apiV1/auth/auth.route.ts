import { Router } from 'express';
import Controller from './auth.controller';

const user: Router = Router();
const controller = new Controller();

// Load Middlewares
import authenticate from '../../helpers/verifyToken';

// Sign In
user.post('/authenticate', controller.authenticate);

// Register New User
user.post('/register', controller.register);

// Query logged in user
user.get('/me', authenticate, controller.queryMe);

// Query user questions
user.get('/me/questions', authenticate, controller.queryUserQuestions);

export default user;
