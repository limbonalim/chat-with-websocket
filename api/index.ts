import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';

import chatRouter, { mountRouter } from './router/chat';
import usersRouter from './router/users';

const port = 8000;
const app = express();
expressWs(app);
mountRouter();

app.use(cors());
app.use('/chat', chatRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server started on ${port} port!`);
});
