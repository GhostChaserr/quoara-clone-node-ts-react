import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config/config';

// Load question model
import Question from '../questions/question.model';
import SuperModule from '../../modules/SuperModule';

export default class QuestionController extends SuperModule {
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

		console.log(req.body);

		let media: any = [];

		if (!images || images.length === 0) {
			media = [
				{
					path: 'sample-image',
					filename: 'sample-filename'
				}
			];
		}

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

		const [ data, error ] = await this.asyncWrapper(newQuestion.save());
		if (error !== undefined) {
			const response = this.generateResponse({ data: null, error: 'failed to save question', status: 400 });
			return res.json({ response });
		}

		const response = this.generateResponse({ data: newQuestion, error: null, status: 200 });
		res.json({ response });
	};

	public updateQuestion = async (req: any, res: Response) => {
		// Query question
		let question = await Question.findById(req.params.id);
		switch (req.query.action) {
			case 'upvote-question':
				// Upvote
				question.voters.push(req.user._id);
				question.votes = question.votes + 1;
				await question.save();

				// Return response
				let response = this.generateResponse({ data: question, error: null, status: 200 });
				return res.json({ response }).status(200);
			case 'answer-question':
				// Create new answer

				// return res.json({ body: req.body })

				// if (!req.body.answer) return res.json({ msg: 'provide answer!' });

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

				console.log(question.answers)
				await question.save();

				return res.json({ user: question })

				response = this.generateResponse({ data: question, error: null, status: 200 });
				return res.json({ response }).status(200);
			case 'trash-question':
				question.status = 'deleted';
				await question.save();
				return res.json({ msg: question });
			default:
				return res.json({ msg: 'provide action' });
		}
	};
}
