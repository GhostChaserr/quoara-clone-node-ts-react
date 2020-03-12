import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './question.controller';

// Load middlewsre
import authenticate from '../../helpers/verifyToken';

const question: Router = Router();
const controller = new Controller();

// Retrieve all questions
question.get('/', controller.queryQuestions);

// Register new question
question.post('/', authenticate, controller.createQuestion);

export default question;
