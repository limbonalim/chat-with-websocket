import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import Login from './feachers/Users/Login.tsx';
import Register from './feachers/Users/Register.tsx';
import Chat from './feachers/Chat/Chat.tsx';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectUser } from './feachers/Users/usersSlice.ts';
import { BASE_WS_URL, IMessageType } from './constants.ts';
import { getMessages, getUsers } from './feachers/Chat/chatSlice.ts';
import type { ISendMessage } from './feachers/Chat/ChatForm.tsx';
import type { IMessage } from './types';

const App = () => {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);

	const { lastMessage, readyState, sendMessage, getWebSocket } = useWebSocket(
		BASE_WS_URL,
		{
			retryOnError: true,
			reconnectAttempts: 10,
			reconnectInterval: 3000,
		},
	);

	useEffect(() => {
		navigate('/chat');
	}, []);

	const handleSendMessage = (message: ISendMessage) => {
		sendMessage(JSON.stringify(message));
	};

	const handleDisconnect = () => {
		const disconnectMessage = {
			type: IMessageType.logout,
		};
		sendMessage(JSON.stringify(disconnectMessage));
		getWebSocket()?.close();
	};

	useEffect(() => {
		if (!lastMessage) return;
		const message = JSON.parse(lastMessage.data) as IMessage;
		if (message) {
			if (message.type === IMessageType.newMessage) {
				dispatch(getMessages(message.payload));
			}
			if (message.type === IMessageType.activeUsersInfo) {
				dispatch(getUsers(message.payload));
			}
		}
	}, [lastMessage]);

	useEffect(() => {
		if (readyState === ReadyState.OPEN) {
			const loginData = {
				type: IMessageType.login,
				payload: { user: user?.token },
			};
			sendMessage(JSON.stringify(loginData));
		}
	}, [readyState, sendMessage]);

	return (
		<>
			<Layout disconect={handleDisconnect}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/chat"
						element={<Chat sendMessage={handleSendMessage} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</>
	);
};

export default App;
