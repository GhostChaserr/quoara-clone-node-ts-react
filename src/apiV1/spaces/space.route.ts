import { Router } from 'express';
import Controller from './space.controller';
import authenticate from '../../helpers/verifyToken';

const space = Router();
const controller = new Controller();

space.get('/', controller.querySpaces);
space.get('/:id/questions', controller.querySpaceQuestions);
space.post('/', authenticate, controller.createSpace);
space.post('/:id', authenticate, controller.updateSpace);

export default space;
