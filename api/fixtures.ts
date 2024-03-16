import mongoose from 'mongoose';
import config from './config';
import User, { Roles } from './models/usersSchema';
import Message from './models/messagesSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const models = [Message, User];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}

	const [moderator, user] = await User.create(
		{
			email: 'Admin',
			password: '123321',
			displayName: 'SuperAdmin',
			token: crypto.randomUUID(),
			role: Roles.moderator,
		},
		{
			email: 'User',
			password: '123321',
			displayName: 'SuperUser',
			token: crypto.randomUUID(),
			role: Roles.user,
		},
	);

	await Message.create(
		{
			message: 'some test message',
			user: user,
			recipient: moderator,
		},
		{
			message: 'some test message2',
			user: user,
			recipient: moderator,
		},
		{
			message: 'some test message1 from moderator',
			user: moderator,
			recipient: user,
		},
		{
			message: 'some test message2 from moderator',
			user: moderator,
			recipient: user,
		},
	);

	await db.close();
};

void run();
