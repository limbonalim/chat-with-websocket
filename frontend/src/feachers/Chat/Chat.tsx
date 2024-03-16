import ChatUsersList from './ChatUsersList.tsx';
import ChatMessagesList from './ChatMessagesList.tsx';
import { Grid } from '@mui/material';
import { useEffect, useRef } from 'react';
import ChatForm, { ISendMessage } from './ChatForm.tsx';
import { BASE_WS_URL } from '../../constants.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { getMessages } from './chatSlice.ts';
import type { IMessage } from '../../types';

const Chat = () => {
	const ws = useRef<WebSocket | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		ws.current = new WebSocket(BASE_WS_URL);
		ws.current.onclose = () => console.log('ws closedd');

		ws.current.onmessage = (event) => {
			const decodedMessage = JSON.parse(event.data) as IMessage[];
			dispatch(getMessages(decodedMessage));
		};

		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	const sendMessage = (message: ISendMessage) => {
		if (!ws.current) return;
		ws.current.send(JSON.stringify(message));
	};

	return (
		<>
			<Grid container spacing={1}>
				<Grid>
					<ChatUsersList />
				</Grid>
				<Grid>
					<ChatMessagesList />
					<ChatForm sendMessage={sendMessage} />
				</Grid>
			</Grid>
		</>
	);
};

export default Chat;
