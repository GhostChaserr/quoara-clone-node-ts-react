import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		question: {
			type: String
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
