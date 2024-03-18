import Layout from './components/UI/Layout/Layout.tsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import Login from './feachers/Users/Login.tsx';
import Register from './feachers/Users/Register.tsx';
import Chat from './feachers/Chat/Chat.tsx';
import { useEffect } from 'react';

const App = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/chat');
	}, []);

	return (
		<>
			<Layout>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</>
	);
};

export default App;
