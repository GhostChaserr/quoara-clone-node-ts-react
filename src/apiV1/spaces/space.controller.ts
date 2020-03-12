import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

// Load models
import Space from './space.model';
import Question from '../questions/question.model';

export default class SpaceController {
	public querySpaces = async (req: Request, res: Response) => {
		const spaces = await Space.find();

		return res.json({ data: spaces });
	};

	public querySpaceQuestions = async (req: Request, res: Response) => {
		// Query questions for given space
		const questions = await Question.find({ space: req.params.id });

		return res.json({ questions });
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
					return res.json({ msg: 'already member' });
				}

				space.members.push(user);
				space.save();

				return res.json({ msg: space.members });
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
