export const BASE_URL = 'http://localhost:8000';
export const BASE_WS_URL = 'ws://localhost:8000/chat';

export enum Roles {
	user = 'user',
	moderator = 'moderator',
}

export enum IMessageType {
	login = 'LOGIN',
	logout = 'LOGOUT',
	newMessage = 'NEW_MESSAGE',
	sendMessage = 'SEND_MESSAGE',
	activeUsersInfo = 'ACTIVE_USERS_INFO',
	deleteMessage = 'DELETE_MESSAGE',
	personalMessage = 'SEND_PERSONAL_MESSAGE',
}
