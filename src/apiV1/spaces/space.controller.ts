import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

export default class SpaceController {
	public findAll = (req: Request, res: Response) => {
		return [];
	};
}
