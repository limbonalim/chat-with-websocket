import { Grid } from '@mui/material';
import ChatMessageItem from '../../components/ChatMessageItem/ChatMessageItem.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectMessages } from './chatSlice.ts';
import { ISendMessage } from './ChatForm.tsx';

interface Props {
	sendMessage: (message: ISendMessage) => void;
}

const ChatMessagesList: React.FC<Props> = ({ sendMessage }) => {
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
				sendMessage={sendMessage}
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
