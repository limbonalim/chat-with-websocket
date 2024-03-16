import { Grid } from '@mui/material';
import ChatMessageItem from '../../components/ChatMessageItem/ChatMessageItem.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectMessages } from './chatSlice.ts';

const ChatMessagesList = () => {
	const messages = useAppSelector(selectMessages);

	const render = messages.map(({ payload }) => (
		<ChatMessageItem
			key={payload._id}
			_id={payload._id}
			message={payload.message}
			createdAt={payload.createdAt}
			user={payload.user}
			recipient={payload.recipient}
		/>
	));

	return (
		<Grid container direction="column" spacing={1} mb={2}>
			{render}
		</Grid>
	);
};

export default ChatMessagesList;
