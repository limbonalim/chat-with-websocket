import express, { json } from 'express';
import expressWs from 'express-ws';
import cors from 'cors';

import chatRouter, { mountRouter } from './router/chat';
import usersRouter from './router/users';
import mongoose from 'mongoose';
import config from './config';

const app = express();
app.use(cors());
app.use(json());
app.use('/users', usersRouter);

expressWs(app);
mountRouter();
app.use('/chat', chatRouter);

const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(config.port, () => {
		console.log(`Server started on ${config.port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
