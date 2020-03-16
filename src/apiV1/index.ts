import { Router } from 'express';
import auth from './auth/auth.route';

// Load routes
import users from './users/user.route';
import questions from './questions/questions.route';
import spaces from './spaces/space.route';

// Load swagger
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../swagger.json";

const router: Router = Router();

// Registering routes
router.use('/', auth);
router.use('/users', users);
router.use('/questions', questions);
router.use('/spaces', spaces);

export default router;
