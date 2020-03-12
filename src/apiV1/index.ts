import { Router } from 'express';
import auth from './auth/auth.route';

// Load routes
import users from './users/user.route';
import questions from './questions/questions.route';

const router: Router = Router();

// Registering routes
router.use('/', auth);
router.use('/users', users);
router.use('/questions', questions);

export default router;
