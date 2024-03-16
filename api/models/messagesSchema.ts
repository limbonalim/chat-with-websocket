import { Schema, model } from 'mongoose';
import User from './usersSchema';
import { IMessageFields, IMessageModel } from '../types';

const messagesSchema = new Schema<IMessageFields, IMessageModel, unknown>({
	message: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users',
		validate: {
			validator: async (userId: Schema.Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User is not found!',
		},
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
	recipient: {
		type: Schema.Types.ObjectId,
		ref: 'users',
		validate: {
			validator: async (userId: Schema.Types.ObjectId) => {
				const user = await User.findById(userId);
				return Boolean(user);
			},
			message: 'User (recipient) is not found!',
		},
	},
});

const Message = model<IMessageFields, IMessageModel>(
	'messages',
	messagesSchema,
);

export default Message;
