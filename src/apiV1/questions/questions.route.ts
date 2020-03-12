import { Router } from 'express';
import verifyToken from '../../helpers/verifyToken';
import Controller from './question.controller';

const question: Router = Router();
const controller = new Controller();

// Retrieve all questions
question.get('/', controller.findAll);

export default question;
