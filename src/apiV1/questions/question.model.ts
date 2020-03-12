import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UserSchema, PhotoSchema } from '../shared/shared.model';

const AnswerSchema = new Schema({
	answer: {
		type: String,
		required: true
	},
	user: new Schema({
		name: {
			type: String,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			required: true
		}
	}),
	created_at: {
		type: Date,
		default: Date.now()
	}
});

const QuestionSchema = new Schema(
	{
		user: UserSchema,
		question: {
			type: String,
			required: true
		},
		images: [ PhotoSchema ],
		space: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Space'
		},
		voters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		up_votes: {
			type: Number,
			default: 0
		},
		answers: [ AnswerSchema ],
		tags: { type: [ String ], index: true }
	},
	{
		timestamps: true,
		useNestedStrict: true
	}
);

export default mongoose.model('Question', QuestionSchema);
