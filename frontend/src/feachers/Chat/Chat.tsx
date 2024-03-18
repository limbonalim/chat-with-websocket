import ChatUsersList from './ChatUsersList.tsx';
import ChatMessagesList from './ChatMessagesList.tsx';
import { Grid } from '@mui/material';
import ChatForm, { ISendMessage } from './ChatForm.tsx';
import Protected from '../../components/UI/Protected/Protected.tsx';

interface Props {
	sendMessage: (message: ISendMessage) => void;
}

const Chat: React.FC<Props> = ({ sendMessage }) => {
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
