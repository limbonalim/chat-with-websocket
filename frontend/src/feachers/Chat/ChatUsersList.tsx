import { Grid } from '@mui/material';
import ChatUserItem from '../../components/ChatUserItem/ChatUserItem.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUsers } from './chatSlice.ts';

const ChatUsersList = () => {
	const users = useAppSelector(selectUsers);
	const render = users.map(({ displayName, avatar }, index) => (
		<ChatUserItem key={index} displayName={displayName} avaatar={avatar} />
	));

	return (
		<Grid container direction="column" spacing={1}>
			{render}
		</Grid>
	);
};

export default ChatUsersList;
