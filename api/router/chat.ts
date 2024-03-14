import express from 'express';
import {ActiveConnections} from '../types';

const chatRouter = express.Router();
const activeConnections: ActiveConnections = {};

export const mountRouter = () => {
	chatRouter.ws('/', (ws, req) => {
		const id = crypto.randomUUID();
		console.log(`client (${id}) is connected`);
		activeConnections[id] = ws;


		ws.on('message', (message) => {
			const parsedDraw = JSON.parse(message.toString());
			Object.values(activeConnections).forEach((connection) => {

			});
		});



		ws.on('close', () => {
			console.log(`client ${id} is disconnected!`);
			delete activeConnections[id];
		});
	});
};

export default chatRouter;