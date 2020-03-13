import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './question.controller';

// Load middlewsre
import authenticate from '../../helpers/verifyToken';
import AuthModule from '../../modules/AuthModule';

const question: Router = Router();
const controller = new Controller();
const authModule = new AuthModule();

const { authenticateUser } = authModule;

// Retrieve all questions
question.get('/', controller.queryQuestions);

// Register new question
question.post('/', authenticateUser, controller.createQuestion);
question.post('/:id', authenticate, controller.updateQuestion);

export default question;
