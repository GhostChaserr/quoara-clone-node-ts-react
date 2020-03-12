import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

// Load question model
import Question from '../questions/question.model';

export default class QuestionController {
	public queryQuestions = async (req: Request, res: Response) => {
		try {
			const questions = await Question.find();
			return res.json({
				data: questions
			});
		} catch (error) {
			return res.json({
				error: error
			});
		}
	};

	public createQuestion = async (req: any, res: Response) => {
		// Deconstruct body
		const { tags, question, images } = req.body;

		let media: any = [];

		if (!images || images.length === 0) {
			media = [
				{
					path: 'sample-image',
					filename: 'sample-filename'
				}
			];
		}

		try {
			// Createnew question
			let newQuestion = new Question({
				question: question,
				user: {
					user: req.user._id,
					name: req.user.name,
					lastName: req.user.lastName
				},
				images: media,
				answers: [],
				tags: tags
			});

			// Save question
			newQuestion = await newQuestion.save();

			return res.json({
				data: newQuestion
			});
		} catch (error) {
			return res.json({ error });
		}
	};

	public updateQuestion = async (req: any, res: Response) => {
		// Query question
		let question = await Question.findById(req.params.id);
		switch (req.query.action) {
			case 'upvote-question':
				question.voters.push(req.user._id);
				question.votes = question.votes + 1;
				await question.save();
				return res.json({ msg: question });
			case 'answer-question':
				// Create new answer

				if (!req.body.answer) return res.json({ msg: 'provide answer!' });

				let answer = {
					answer: req.body.answer,
					user: {
						user: req.user._id,
						name: req.user.name,
						lastName: req.user.lastName
					},
					voters: []
				};
				question.answers.push(answer);
				await question.save();

				return res.json({ msg: question });
			case 'trash-question':
				question.status = 'deleted';
				await question.save();
				return res.json({ msg: question });
			default:
				return res.json({ msg: 'provide action' });
		}
	};
}
