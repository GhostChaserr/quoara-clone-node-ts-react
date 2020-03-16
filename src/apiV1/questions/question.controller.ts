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
		// let question = await Question.findById(req.params.id);
		let response = {}

		const [question, questionError] = await this.asyncWrapper(Question.findById(req.params.id));

		if(questionError !== undefined) {

			response = this.generateResponse({ data: null, error: 'unable to query question', status: 500 });
			return res.status(404).json({ response })
		};

		switch (req.query.action) {
			case 'upvote-question':

				// Check if already voted
				const hasVoted = question.voters.some((voter: any) => voter._id == req.user._id);
				
				if(hasVoted){
					response = this.generateResponse({ data: null, error: 'alredy voted', status: 200 });
					return res.status(400).json({ response })
				};

				// Update voters array
				question.voters.push(req.user._id);
				question.votes = question.votes + 1;

				// Save update
				const [upvotedQuestion, upvoteError] = await this.asyncWrapper(question.save());

				if(upvoteError !== undefined){
					response = this.generateResponse({ data: null, error: 'upvote failed', status: 200 });
					return res.status(500).json({ response })
				};

				response = this.generateResponse({ data: upvotedQuestion, error: null, status: 200 });
				return res.status(200).json({ response });

			case 'answer-question':

				// Generate new answer
				let answer = {
					answer: req.body.answer,
					user: {
						user: req.user._id,
						name: req.user.name,
						lastName: req.user.lastName
					},
					voters: []
				};

				// Push answer to answers array
				question.answers.push(answer);

				// Perform update
				const [savedAnswer, saveError] = await this.asyncWrapper(question.save());

				if(saveError !== undefined){
					
					response = this.generateResponse({ data: null, error: 'failed to post answer', status: 200 });
					return res.status(500).json({ response })
				}

				response =  this.generateResponse({ data: savedAnswer, error: null, status: 200 });
				return res.status(200).json({ response  });

			case 'trash-question':
				question.status = 'deleted';
				await question.save();
				return res.json({ msg: question });
			default:
				return res.json({ msg: 'provide action' });
		}
	};
}
