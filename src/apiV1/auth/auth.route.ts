import { Router } from 'express';
import Controller from './auth.controller';

const user: Router = Router();
const controller = new Controller();

// Load Middlewares
import AuthModule from '../../modules/AuthModule';

const authModule = new AuthModule();
const { authenticateUser } = authModule;
// Sign In
user.post('/authenticate', controller.authenticate);

// Register New User
user.post('/register', controller.register);

// Query logged in user
user.get('/me', authenticateUser, controller.queryMe);

// Query user questions
user.get('/me/questions', authenticateUser, controller.queryUserQuestions);

// Query user owned or joined spaces
user.get('/me/spaces', authenticateUser, controller.queryUserSpaces);

export default user;
