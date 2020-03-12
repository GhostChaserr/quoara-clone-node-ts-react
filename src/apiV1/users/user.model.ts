import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Load schema
import { PhotoSchema } from '../shared/shared.model';

const UserSchema = Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			required: true,
			trim: true
		},
		password: {
			type: String,
			required: true,
			trim: true
		},
		avatar: PhotoSchema,
		role: {
			type: String,
			enum: [ 'admin', 'user' ]
		}
	},
	{
		timestamps: true,
		useNestedStrict: true
	}
);

export default mongoose.model('User', UserSchema);
