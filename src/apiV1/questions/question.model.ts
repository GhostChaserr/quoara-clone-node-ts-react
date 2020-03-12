import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UserSchema } from '../shared/shared.model';

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
			type: String
		},
		space: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Space'
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
