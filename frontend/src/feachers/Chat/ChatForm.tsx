import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
	Button,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { IMessageType } from '../../constants.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../Users/usersSlice.ts';
import { selectUsers } from './chatSlice.ts';

interface Props {
	sendMessage: (message: ISendMessage) => void;
}

export interface ISendMessage {
	type:
		| IMessageType.sendMessage
		| IMessageType.personalMessage
		| IMessageType.deleteMessage;
	payload:
		| {
				message: string;
				user: string;
				recipient?: string;
		  }
		| string;
}

const ChatForm: React.FC<Props> = ({ sendMessage }) => {
	const [state, setState] = useState({
		message: '',
		recipient: '',
	});
	const user = useAppSelector(selectUser);
	const users = useAppSelector(selectUsers);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setState((prevState) => ({
			...prevState,
			message: value,
		}));
	};

	const selectUsersHandler = async (e: SelectChangeEvent) => {
		const { value } = e.target;
		setState((prevState) => ({
			...prevState,
			recipient: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;
		const messageData: ISendMessage = {
			type: state.recipient
				? IMessageType.personalMessage
				: IMessageType.sendMessage,
			payload: {
				message: state.message,
				user: user.token,
				recipient: state.recipient,
			},
		};
		sendMessage(messageData);
		setState({ message: '', recipient: '' });
	};

	const userItems = users.map((item) => (
		<MenuItem key={item._id} value={item._id}>
			{item.displayName}
		</MenuItem>
	));

	return (
		<Box display="flex" component="form" onSubmit={handleSubmit} gap={2}>
			<TextField
				name="message"
				value={state.message}
				onChange={handleChange}
				sx={{ width: '100%' }}
			/>
			<Select
				id="select"
				label="Artist"
				name="artist"
				defaultValue=""
				onChange={selectUsersHandler}
				value={state.recipient}
			>
				{userItems}
			</Select>
			<Button type="submit">Send</Button>
		</Box>
	);
};

export default ChatForm;
