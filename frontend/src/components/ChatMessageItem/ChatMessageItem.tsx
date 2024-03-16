import { Grid, Box, Avatar } from '@mui/material';
import { IMessagePayload } from '../../types';
import FormatDate from '../UI/FormatDate/FormatDate.ts';

const ChatMessageItem: React.FC<IMessagePayload> = ({
	_id,
	message,
	createdAt,
	user,
	recipient,
}) => {
	const author = recipient
		? `${user.displayName} says ${recipient.displayName}`
		: user.displayName;
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
			</Box>
		</Grid>
	);
};

export default ChatMessageItem;
