import { Grid } from '@mui/material';
import ChatUserItem from '../../components/ChatUserItem/ChatUserItem.tsx';

const ChatUsersList = () => {
	return (
		<Grid container direction="column" spacing={1}>
			<ChatUserItem />
			<ChatUserItem />
			<ChatUserItem />
			<ChatUserItem />
		</Grid>
	);
};

export default ChatUsersList;
