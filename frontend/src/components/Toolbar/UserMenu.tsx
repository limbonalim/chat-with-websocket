import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../feachers/Users/usersThunks.ts';
import type { IUser } from '../../types';
import { BASE_URL } from '../../constants.ts';

interface Props {
	user: IUser;
	disconect: () => void;
}

const UserMenu: React.FC<Props> = ({ user, disconect }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();

	let avatar = user.avatar;
	if (user.avatar && user.avatar.slice(0, 6) === 'images/') {
		avatar = `${BASE_URL}/${user.avatar}`;
	}

	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const onClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logout()).unwrap();
		disconect();
	};

	return (
		<>
			<Button color="inherit" onClick={onClick}>
				Hello, {user.displayName}
				{user.avatar ? (
					<Avatar alt={user.displayName} src={avatar} sx={{ mx: 1 }} />
				) : (
					<AccountCircleIcon sx={{ mx: 1 }} />
				)}
			</Button>
			<Menu
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={onClose}
				keepMounted
			>
				<MenuItem onClick={handleLogout}>LogOut</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
