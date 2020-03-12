import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UserSchema, PhotoSchema } from '../shared/shared.model';

const AnswerSchema = new Schema({
	answer: {
		type: String,
		required: true
	},
	user: UserSchema,
	created_at: {
		type: Date,
		default: Date.now()
	},
	voters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	votes: {
		type: Number,
		default: 0
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
		votes: {
			type: Number,
			default: 0
		},
		answers: [ AnswerSchema ],
		tags: { type: [ String ], index: true },
		status: {
			type: String,
			enum: [ 'deleted', 'active' ],
			default: 'active'
		}
	},
	{
		timestamps: true,
		useNestedStrict: true
	}
);

export default mongoose.model('Question', QuestionSchema);
