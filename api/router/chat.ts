import express from 'express';
import { randomUUID } from 'crypto';
import User from '../models/usersSchema';
import { IActiveConnections, IComingMessage } from '../types';
import Message from '../models/messagesSchema';
import { Document } from 'mongoose';

export enum IMessageType {
	login = 'LOGIN',
	logout = 'LOGOUT',
	newMessage = 'NEW_MESSAGE',
	sendMessage = 'SEND_MESSAGE',
	activeUsersInfo = 'ACTIVE_USERS_INFO',
	deleteMessage = 'DELETE_MESSAGE',
	personalMessage = 'SEND_PERSONAL_MESSAGE',
}

const chatRouter = express.Router();
const activeConnections: IActiveConnections[] = [];

const filterActiveConnections = () => {
	const setPayload = new Set();
	const uniqueObjects = activeConnections
		.map((item) => item.user)
		.filter((obj) => {
			if (!obj) return false;

			if (setPayload.has(obj._id?.toString())) {
				return false;
			}
			setPayload.add(obj._id?.toString());
			return true;
		});

	return uniqueObjects;
};

const saveMessage = async (
	messageData: IComingMessage,
	isPersonal: boolean,
) => {
	let recipient;
	const user = await User.findOne({
		token: messageData.payload.user,
	});

	if (messageData.payload.recipient && isPersonal) {
		recipient = await User.findOne({
			token: messageData.payload.recipient,
		});
	}

	const message = new Message({
		message: messageData.payload.message,
		user,
		recipient,
		isPersonal,
	});
	await message.save();
};

export const mountRouter = () => {
	chatRouter.ws('/', async (ws, req, next) => {
		const id = randomUUID();
		let user: Document | null;
		console.log(`client (${id}) is connected`);
		activeConnections.push({ id, ws });

		const findMessage = async () => {
			const allMessages = await Message.find({
				isPersonal: false,
			})
				.populate([
					{ path: 'user', select: 'displayName avatar -_id' },
					{ path: 'recipient', select: 'displayName avatar -_id' },
				])
				.limit(30)
				.exec();

			const userMessages = await Message.find({
				isPersonal: true,
				user: user?._id,
			})
				.populate([
					{ path: 'user', select: 'displayName avatar -_id' },
					{ path: 'recipient', select: 'displayName avatar -_id' },
				])
				.limit(30)
				.exec();

			const forUserMessage = await Message.find({
				isPersonal: true,
				recipient: user?._id,
			})
				.populate([
					{ path: 'user', select: 'displayName avatar -_id' },
					{ path: 'recipient', select: 'displayName avatar -_id' },
				])
				.limit(30)
				.exec();

			const payload = [...allMessages, ...userMessages, ...forUserMessage].sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			);
			return {
				type: IMessageType.newMessage,
				payload,
			};
		};

		ws.on('message', async (message) => {
			try {
				const messageData = JSON.parse(message.toString()) as IComingMessage;

				if (messageData.type === IMessageType.sendMessage) {
					await saveMessage(messageData, false);
					const answer = await findMessage();

					activeConnections.forEach((connection) => {
						connection.ws.send(JSON.stringify(answer));
					});
				} else if (messageData.type === IMessageType.login) {
					const findUser = await User.findOne({
						token: messageData.payload.user,
					}).select('displayName avatar');

					if (!findUser) {
						activeConnections.filter((collection) => collection.id === id);
						return ws.close();
					}
					const index = activeConnections.findIndex(
						(collection) => collection.id === id,
					);
					if (index < 0) return ws.close();

					activeConnections[index].user = findUser.toJSON();

					const answer = await findMessage();

					const userInfo = {
						type: IMessageType.activeUsersInfo,
						payload: Array.from(filterActiveConnections()),
					};
					activeConnections.forEach((connection) => {
						connection.ws.send(JSON.stringify(userInfo));
					});
					ws.send(JSON.stringify(answer));
				} else if (messageData.type === IMessageType.logout) {
					console.log(`client ${id} is logout!`);
					activeConnections.filter((collection) => collection.id === id);
					const users = activeConnections.map(async (connection) => {
						const user = await User.findById(connection.user)
							.select('displayName avatar -_id')
							.exec();
						return user;
					});
					const answer = { type: IMessageType.activeUsersInfo, payload: users };

					const userInfo = {
						type: IMessageType.activeUsersInfo,
						payload: Array.from(filterActiveConnections()),
					};

					activeConnections.forEach((connection) => {
						connection.ws.send(JSON.stringify(userInfo));
					});
					return ws.send(JSON.stringify(answer));
				} else if (messageData.type === IMessageType.personalMessage) {
					if (!user)
						return activeConnections.filter(
							(collection) => collection.id === id,
						);
					await saveMessage(messageData, true);
					const answer = await findMessage();

					activeConnections.forEach((connection) => {
						connection.ws.send(JSON.stringify(answer));
					});
				} else if (messageData.type === IMessageType.deleteMessage) {
					await Message.deleteOne({ _id: messageData.payload });
					const answer = await findMessage();
					activeConnections.forEach((connection) => {
						connection.ws.send(JSON.stringify(answer));
					});
				}
			} catch (e) {
				next(e);
			}
		});

		ws.on('close', () => {
			console.log(`client ${id} is disconnected!`);
			activeConnections.filter((collection) => collection.id === id);
		});
	});
};

export default chatRouter;
