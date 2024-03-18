import { Grid, Box, Avatar, Button } from '@mui/material';
import FormatDate from '../UI/FormatDate/FormatDate.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../feachers/Users/usersSlice.ts';
import { IMessagePayload } from '../../types';
import { IMessageType, Roles } from '../../constants.ts';
import { ISendMessage } from '../../feachers/Chat/ChatForm.tsx';

interface Props extends IMessagePayload {
	sendMessage: (message: ISendMessage) => void;
}

const ChatMessageItem: React.FC<Props> = ({
	_id,
	message,
	createdAt,
	user,
	recipient,
	sendMessage,
}) => {
	const currentUser = useAppSelector(selectUser);
	const author = recipient
		? `${user.displayName} says ${recipient.displayName}`
		: user.displayName;

	let deleteButton;

	const handleDeleteMessage = () => {
		if (!_id) return;
		const deleteMessage: ISendMessage = {
			type: IMessageType.deleteMessage,
			payload: _id,
		};

		sendMessage(deleteMessage);
	};

	if (currentUser?.role === Roles.moderator) {
		deleteButton = <Button onClick={handleDeleteMessage}>Delete</Button>;
	}

	return (
		<Grid item>
			<Box
				border="1px solid #1591c2"
				borderRadius={2}
				sx={{ background: '#e6edeb' }}
			>
				<Box
					display="flex"
					gap={1}
					border="1px solid blue"
					alignItems="center"
					borderRadius={2}
					p={1}
				>
					<Box>{new FormatDate(createdAt).getFormatDate()}</Box>
					<Avatar />
					<Box>{author}:</Box>
				</Box>
				<Box p={1}>{message}</Box>
				{deleteButton}
			</Box>
		</Grid>
	);
};

export default ChatMessageItem;
