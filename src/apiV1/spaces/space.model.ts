import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

import { UserSchema, AdminSchema, PhotoSchema } from '../shared/shared.model';

const SpaceSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		cover: PhotoSchema,
		members: [ UserSchema ],
		admins: [ AdminSchema ]
	},
	{
		timestamps: true,
		useNestedStrict: true
	}
);

export default mongoose.model('Space', SpaceSchema);
