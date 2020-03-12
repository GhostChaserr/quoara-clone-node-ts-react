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
}
