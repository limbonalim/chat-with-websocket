import ChatUsersList from './ChatUsersList.tsx';
import ChatMessagesList from './ChatMessagesList.tsx';
import { Grid } from '@mui/material';
import { useEffect, useRef } from 'react';
import ChatForm, { ISendMessage } from './ChatForm.tsx';
import Protected from '../../components/UI/Protected/Protected.tsx';
import { BASE_WS_URL, IMessageType } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getMessages, getUsers } from './chatSlice.ts';
import { selectUser } from '../Users/usersSlice.ts';
import type { IMessage } from '../../types';

const Chat = () => {
	const ws = useRef<WebSocket | null>(null);
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const login = async () => {
		if (!ws.current) return;
		const interval = 1000;
		if (ws.current?.readyState === 1) {
			const loginData = {
				type: IMessageType.login,
				payload: { user: user?.token },
			};
			ws.current.send(JSON.stringify(loginData));
		} else {
			setTimeout(login, interval);
		}
	};

	useEffect(() => {
		ws.current = new WebSocket(BASE_WS_URL);
		void login();
		if (!ws.current) return;
		ws.current.onclose = () => console.log('ws closed');

		ws.current.onmessage = (event) => {
			const decodedMessage = JSON.parse(event.data) as IMessage;
			if (decodedMessage.type === IMessageType.newMessage) {
				dispatch(getMessages(decodedMessage.payload));
			}
			if (decodedMessage.type === IMessageType.activeUsersInfo) {
				dispatch(getUsers(decodedMessage.payload));
			}
		};

		return () => {
			if (ws.current) {
				const logoutMessage = {
					type: IMessageType.logout,
					payload: user?.token,
				};
				ws.current.send(JSON.stringify(logoutMessage));
				ws.current.close();
			}
		};
	}, []);

	const sendMessage = (message: ISendMessage) => {
		if (!ws.current) return;
		ws.current.send(JSON.stringify(message));
	};

	return (
		<Protected>
			<Grid container spacing={1}>
				<Grid>
					<ChatUsersList />
				</Grid>
				<Grid>
					<ChatMessagesList />
					<ChatForm sendMessage={sendMessage} />
				</Grid>
			</Grid>
		</Protected>
	);
};

export default Chat;
