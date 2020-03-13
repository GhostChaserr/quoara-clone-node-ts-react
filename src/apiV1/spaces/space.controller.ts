import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

// Load models
import Space from './space.model';
import Question from '../questions/question.model';
import SuperModule from '../../modules/SuperModule';

export default class SpaceController extends SuperModule {
	public querySpaces = async (req: Request, res: Response) => {
		
		const [spaces, error] = await this.asyncWrapper(Space.find())

		// Generate error response
		if(error !== undefined){
			const response = this.generateResponse({ data: null, error: "failed to query spaces", status: 500 });
			return res.json({ response });
		}

		// Generate success response
		const response = this.generateResponse({ data: spaces, error: null, status: 200 });
		return res.json({ response });

	};

	public querySpaceQuestions = async (req: Request, res: Response) => {

		// Query questions for given space
		const [questions, error] = await this.asyncWrapper(Question.find({ space: req.params.id }));

		if(error !== undefined) {
			const response = this.generateResponse({ data: null, error: 'faled to query space questions', status: 400 });
			return res.json({ response });
		};

		// Query questions for given space
		const response = this.generateResponse({ data: questions, error:  null, status: 200 });
		return res.json({ response }).status(200);
		
	};

	public createSpace = async (req: any, res: Response) => {
		let cover = req.body.cover;

		if (!cover || !cover.pah) {
			cover = {
				path: 'cover-path',
				filename: 'cover-filename'
			};
		}

		const space = new Space({
			title: req.body.title,
			description: req.body.description,
			cover: cover,
			members: [],
			admins: [],
			tags: req.body.tags
		});

		const admin = {
			user: req.user._id,
			name: req.user.name,
			lastName: req.user.lastName
		};
		// Add admins
		space.admins.push(admin);

		// Add admin as member
		space.members.push(admin);

		await space.save();

		return res.json({ data: space });
	};

	public updateSpace = async (req, res) => {
		const space = await Space.findById(req.params.id);
		const user = {
			user: req.user._id,
			name: req.user.name,
			lastName: req.user.lastName
		};
		switch (req.query.action) {
			case 'post-question':
				const question = new Question();
				question.user = {
					user: req.user._id,
					name: req.user.name,
					lastName: req.user.lastName
				};
				question.question = 'kitxva';
				(question.images = []), (question.space = req.params.id), (question.voters = []);
				(question.votes = 0), (question.answers = []), (question.tags = []);
				question.status = 'active';

				await question.save();

				return res.json({ msg: question });
			case 'join-space':
				const isMember = space.members.some((member) => member.user == req.user._id);
				if (isMember) {

					console.log(space.members);
					console.log(req.user._id);

					// Generate error response
					const response = this.generateResponse({ data: null, error: 'already member', status: 200 });
					return res.json({ response });
				}

				space.members.push(user);

				// Update space
				const updatedSpace = await space.save();

				// Get newly added member
				const newMember = updatedSpace.members[updatedSpace.members.length - 1];
				
				// Generate success response
				const response = this.generateResponse({ data: newMember, error: null, status: 200 });
				return res.json({ response });
			
			case 'leave-space':
				const isDeleted = space.members.some((member) => member.user == req.user._id);
				if (!isDeleted) {
					return res.json({ msg: 'already left' });
				}

				const members = space.members.filter((member) => member.user != req.user._id);
				space.members = members;
				space.save();
				return res.json({ msg: space.members });
			case 'remove-member':
				const isAdmin = space.admins.some((admin) => admin.user == req.user._id);
				if (!isAdmin) {
					return res.json({ msg: 'required admin access!' });
				}

				const memberExists = space.members.some((member) => member.user == req.body.memberId);
				if (!memberExists) {
					return res.json({ msg: 'member to remove was not found!' });
				}

				const updatedMembers = space.members.filter((member) => member.user != req.body.memberId);
				space.members = updatedMembers;
				space.save();

				return res.json({ msg: updatedMembers });
			case 'assign-admin':
				return res.json({ msg: 'adding admin' });
			case 'remove-admin':
				return res.json({ msg: 'deleting admin' });
			default:
				return res.json({ msg: 'provide action query parameter!' });
		}
	};
}
