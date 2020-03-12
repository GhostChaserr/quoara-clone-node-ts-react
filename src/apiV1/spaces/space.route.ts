import { Router } from 'express';
import Controller from './space.controller';

const space = Router();
const controller = new Controller();

space.get('/', controller.findAll);
