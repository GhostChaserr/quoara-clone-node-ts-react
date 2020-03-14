import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

// Load models
import User from '../users/user.model';
import Question from '../questions/question.model';
import Space from "../spaces/space.model";

// Load Helper mouldes
import SuperModule from '../../modules/SuperModule';

const superModule = new SuperModule();

export default class UserController extends SuperModule {
	public authenticate = async (req: Request, res: Response): Promise<any> => {
		const { email, password } = req.body;

		const [ user, userError ] = await superModule.asyncWrapper(User.findOne({ email }));

		if (userError !== undefined) return res.json({ msg: 'faield to query user' }).status(500);

		if (!user) {
			const response = superModule.generateResponse({ data: null, error: 'user was not found', status: 404 });
			return res.json({ response }).status(404);
		}

		const matchPasswords = await bcrypt.compare(password, user.password);
		if (!matchPasswords) {
			const response = superModule.generateResponse({ data: null, error: 'incoorect password', status: 400 });
			return res.json({ response }).status(400);
		}

		const tokenPayload = {
			_id: user._id,
			name: user.name,
			lastName: user.lastName
		};

		const token = await jwt.sign(tokenPayload, config.JWT_ENCRYPTION, {
			expiresIn: config.JWT_EXPIRATION
		});

		const response = superModule.generateResponse({ data: token, error: null, status: 200 });
		return res.json({ response }).status(200);
	};

	public register = async (req: Request, res: Response): Promise<any> => {
		const { name, lastName, email, password, avatar } = req.body;

		const [ userData, userError ] = await this.asyncWrapper(User.findOne({ email: email }));

		if (userError !== undefined) {
			const response = this.generateResponse({
				data: null,
				error: 'failed to query email register path',
				status: 500
			});
			return res.json({ response }).status(500);
		}

		if (userData) {
			const response = this.generateResponse({ data: null, error: 'email taken', status: 400 });
			return res.json({ response }).status(400);
		}

		const hash = await bcrypt.hash(password, config.SALT_ROUNDS);

		let userAvatar: any = {};

		// Generate sample avatar
		if (!avatar || !avatar.path || !avatar.filename) {
			userAvatar = {
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

		const tokenPayload = {
			_id: newUser._id,
			name: newUser.name,
			lastName: newUser.lastName
		};

		const token = await jwt.sign(tokenPayload, config.JWT_ENCRYPTION, {
			expiresIn: config.JWT_EXPIRATION
		});

		const response = this.generateResponse({ data: token, error: null, status: 200 });
		return res.json({ response }).status(400);
	};

	public queryMe = async (req: any, res: Response): Promise<any> => {
		const [ data, error ] = await superModule.asyncWrapper(
			User.findById(req.user._id).select('name lastName avatar')
		);

		if (error !== undefined) {
			const response = this.generateResponse({ data: null, error: 'faield to query me', status: 501 });
			return res.json({ response }).status(500);
		}

		const response = this.generateResponse({ data: data, error: null, status: 200 });
		return res.json({ response }).status(200);
	};

	public queryUserQuestions = async (req, res) => {
		// Query questions
		const [ questions, error ] = await this.asyncWrapper(Question.find({ 'user.user': req.user._id }));

		if (error !== undefined) {
			const response = this.generateResponse({
				data: null,
				error: 'failed to query user questions',
				status: 500
			});
			return res.json({ response }).status(500);
		}

		// Return reponse
		const response = this.generateResponse({ data: questions, error: null, status: 200 });
		return res.json({ response }).status(200);
	};

	public queryUserSpaces = async (req, res) => {
		let response: object = {}
		switch (req.query.filter) {
			case 'joined':

				const [joinedSpaces, joinedSpacesError] = await this.asyncWrapper(Space.find({
					'members':{
						$elemMatch : {
							'user' : req.user._id
					  }
					}
				}))

				if(joinedSpacesError !== undefined) {

					// Error response
					response = this.generateResponse({ data: null, error: 'failed to query joined spaces', status: 500 });
					return res.json({ response }).status(200);

				}

				// Success response
				response = this.generateResponse({ data: joinedSpaces, error: null, status: 200 });
				return res.json({ response }).status(200);

			case 'owned':

				const [ownedSpaces, ownedSpacesError] = await this.asyncWrapper(Space.find({
					'admins':{
						$elemMatch :{
							'user': req.user._id
						}
					}
				}));

				if(ownedSpacesError !== undefined){

					// Error response
					response = this.generateResponse({ data: null, error: 'failed to query owned spaces', status: 500 });
					return res.json({ response }).status(500)
				}

				response = this.generateResponse({ data: ownedSpaces, error: null, status: 200 });
				return res.json({ response }).status(200)

			default:

				// Error response
				response = this.generateResponse({ data: null, error: 'provide filter query argument', status: 400 });
				return res.json({ response }).status(400)
		}
	}
}
