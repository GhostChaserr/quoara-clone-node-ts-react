import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PhotoSchema = new Schema({
	path: {
		type: String,
		required: true
	},
	filename: {
		type: String,
		required: true
	}
});

export const AdminSchema = new Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true
	},
	avatar: PhotoSchema
});

export const UserSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	lastName: {
		type: String,
		required: true
	},
	avatar: PhotoSchema
});
