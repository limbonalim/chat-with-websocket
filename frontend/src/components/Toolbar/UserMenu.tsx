import React, { useState } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../containers/Users/usersThunks.ts';
import type { IUser } from '../../types';
import { BASE_URL, Roles } from '../../constants.ts';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      <Button color="inherit" onClick={onClick}>
        Hello, {user.displayName}
        {user.avatar? <Avatar alt={user.displayName} src={avatar} sx={{mx: 1}}/> : <AccountCircleIcon sx={{mx: 1}}/>}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} keepMounted>
        <MenuItem onClick={() => dispatch(logout())}>LogOut</MenuItem>
        <MenuItem onClick={() => navigate('/tracks_history')}>Track History</MenuItem>
        <MenuItem onClick={() => navigate('/create_artist')}>Create Artist</MenuItem>
        <MenuItem onClick={() => navigate('/create_album')}>Create Album</MenuItem>
        <MenuItem onClick={() => navigate('/create_track')}>Create Track</MenuItem>
        {user.role === Roles.admin && <MenuItem onClick={() => navigate('/admin')}>Admin Page</MenuItem>}
      </Menu>
    </>
  );
};

export default UserMenu;