import express from 'express';
import { randomUUID } from 'crypto';
import User from '../models/usersSchema';
import { IActiveConnections, IMessage } from '../types';

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
	chatRouter.ws('/', (ws, req) => {
		const id = randomUUID();
		let user;
		console.log(`client (${id}) is connected`);
		activeConnections[id] = ws;

		ws.on('message', (message) => {
			const messageData = JSON.parse(message.toString()) as IMessage;
			if (messageData.type === IMessageType.login) {
				user = User.findOne({ token: messageData.payload.token });
			}
			if (messageData.type === IMessageType.sendMessage) {
				Object.values(activeConnections).forEach((connection) => {
					if (connection !== activeConnections[id]) {
						connection.send(JSON.stringify(messageData));
					}
				});
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
