import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';
import User from '../users/user.model';

export default class UserController {
	public authenticate = async (req: Request, res: Response): Promise<any> => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(404).send({
					success: false,
					message: 'User not found'
				});
			}

			const matchPasswords = await bcrypt.compare(password, user.password);
			if (!matchPasswords) {
				return res.status(401).send({
					success: false,
					message: 'Not authorized'
				});
			}

			const tokenPayload = {
				_id: user._id,
				name: user.name,
				lastName: user.lastName
			};

			const token = await jwt.sign(tokenPayload, config.JWT_ENCRYPTION, {
				expiresIn: config.JWT_EXPIRATION
			});

			res.status(200).send({
				success: true,
				message: 'Token generated Successfully',
				data: token
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				message: err.toString()
			});
		}
	};

	public register = async (req: Request, res: Response): Promise<any> => {
		const { name, lastName, email, password, avatar } = req.body;

		// Check if email taken
		const user = await User.findOne({ email: email });
		if (user) return res.json({ msg: 'email taken' }).status(400);

		try {
			const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

			let avatar: any = {};

			// Generate sample avatar
			if (!avatar.path || !avatar.filename) {
				avatar = {
					path: 'file-path',
					filename: 'file-name'
				};
			}

			const user = new User({
				name,
				lastName,
				email,
				avatar,
				password: hash
			});

			const newUser = await user.save();

			res.status(201).send({
				success: false,
				message: 'User Successfully created',
				data: newUser
			});
		} catch (err) {
			res.status(500).send({
				success: false,
				message: err.toString()
			});
		}
	};

	public queryMe = async (req: any, res: Response): Promise<any> => {
		const user = await User.findById(req.user._id).select('name lastName avatar');
		return res.json({
			data: user,
			success: true,
			error: null
		});
	};
}
