import express from 'express';
import { randomUUID } from 'crypto';
import User from '../models/usersSchema';
import { IActiveConnections, IComingMessage } from '../types';
import Message from '../models/messagesSchema';

export enum IMessageType {
	login = 'LOGIN',
	logout = 'LOGOUT',
	newMessage = 'NEW_MESSAGE',
	sendMessage = 'SEND_MESSAGE',
	deleteMessage = 'DELETE_MESSAGE',
	personalMessage = 'SEND_PERSONAL_MESSAGE',
}

const chatRouter = express.Router();
const activeConnections: IActiveConnections = {};

export const mountRouter = () => {
	chatRouter.ws('/', async (ws, req, next) => {
		const id = randomUUID();
		let user;
		console.log(`client (${id}) is connected`);
		activeConnections[id] = ws;
		const messages = await Message.find({})
			.populate([
				{ path: 'user', select: 'displayName avatar -_id' },
				{ path: 'recipient', select: 'displayName avatar -_id' },
			])
			.limit(30)
			.exec();
		const answer = messages.map((item) => ({
			type: IMessageType.newMessage,
			payload: item,
		}));
		ws.send(JSON.stringify(answer));

		ws.on('message', async (message) => {
			const messageData = JSON.parse(message.toString()) as IComingMessage;

			if (messageData.type === IMessageType.sendMessage) {
				try {
					let recipient;
					const user = await User.findOne({
						token: messageData.payload.user,
					});
					if (messageData.payload.recipient) {
						recipient = await User.findOne({
							token: messageData.payload.recipient,
						});
					}

					const message = new Message({
						message: messageData.payload.message,
						user,
						recipient: recipient ? recipient : undefined,
					});
					await message.save();

					const messages = await Message.find({})
						.populate([
							{ path: 'user', select: 'displayName avatar -_id' },
							{ path: 'recipient', select: 'displayName avatar -_id' },
						])
						.limit(30)
						.exec();
					const answer = messages.map((item) => ({
						type: IMessageType.newMessage,
						payload: item,
					}));

					Object.values(activeConnections).forEach((connection) => {
						connection.send(JSON.stringify(answer));
					});
				} catch (e) {
					next(e);
				}
			}
		});

		ws.on('close', () => {
			console.log(`client ${id} is disconnected!`);
			user = null;
			delete activeConnections[id];
		});
	});
};

export default chatRouter;
