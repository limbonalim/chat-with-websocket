import { Grid } from '@mui/material';
import ChatMessageItem from '../../components/ChatMessageItem/ChatMessageItem.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectMessages } from './chatSlice.ts';

const ChatMessagesList = () => {
	const messages = useAppSelector(selectMessages);

	const render = messages.map(
		({ _id, message, createdAt, user, recipient }) => (
			<ChatMessageItem
				key={_id}
				_id={_id}
				message={message}
				createdAt={createdAt}
				user={user}
				recipient={recipient}
			/>
		),
	);

	return (
		<Grid container direction="column" spacing={1} mb={2}>
			{render}
		</Grid>
	);
};

export default ChatMessagesList;
