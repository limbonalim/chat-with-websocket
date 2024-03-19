import { Grid } from '@mui/material';
import ChatUserItem from '../../components/ChatUserItem/ChatUserItem.tsx';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUsers } from './chatSlice.ts';

const ChatUsersList = () => {
	const users = useAppSelector(selectUsers);
	const render = users.map(({ _id, displayName, avatar }) => (
		<ChatUserItem
			key={_id}
			_id={_id}
			displayName={displayName}
			avatar={avatar}
		/>
	));

	return (
		<Grid container direction="column" spacing={1}>
			{render}
		</Grid>
	);
};

export default ChatUsersList;
