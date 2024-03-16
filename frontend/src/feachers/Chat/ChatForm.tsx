import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { IMessageType } from '../../constants.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';

interface Props {
	sendMessage: (message: ISendMessage) => void;
}

export interface ISendMessage {
	type: IMessageType.sendMessage | IMessageType.personalMessage;
	payload: {
		message: string;
		user: string;
	};
}

const ChatForm: React.FC<Props> = ({ sendMessage }) => {
	const [message, setMessage] = useState('');
	const user = useAppSelector(selectUser);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setMessage(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;
		const messageData: ISendMessage = {
			type: IMessageType.sendMessage,
			payload: {
				message,
				user: user.token,
			},
		};
		sendMessage(messageData);
		setMessage('');
	};

	return (
		<Box display="flex" component="form" onSubmit={handleSubmit} gap={2}>
			<TextField
				name="message"
				value={message}
				onChange={handleChange}
				sx={{ width: '100%' }}
			/>
			<Button type="submit">Send</Button>
		</Box>
	);
};

export default ChatForm;
