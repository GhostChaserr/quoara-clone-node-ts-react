import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

export default class QuestionController {
	public findAll = (req: Request, res: Response) => {
		return [];
	};
}
