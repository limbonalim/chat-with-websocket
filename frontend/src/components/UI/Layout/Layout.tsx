import React, { PropsWithChildren } from 'react';
import { Container } from '@mui/material';
import Toolbar from '../../Toolbar/Toolbar.tsx';

interface Props extends PropsWithChildren {
	disconect: () => void;
}

const Layout: React.FC<Props> = ({ children, disconect }) => {
	return (
		<>
			<header>
				<Container sx={{ mb: 2 }}>
					<Toolbar disconect={disconect} />
				</Container>
			</header>
			<main>
				<Container sx={{ mt: 2 }}>{children}</Container>
			</main>
		</>
	);
};

export default Layout;
