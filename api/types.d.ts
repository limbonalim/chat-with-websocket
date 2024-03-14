import { WebSocket } from 'ws';
import { Model, Schema } from 'mongoose';

export interface IUserFields {
	email: string;
	password: string;
	role: string;
	token: string;
	displayName: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;

export interface IMessageFields {
	message: string;
	user: Schema.Types.ObjectId;
	createdAt: Date;
	recipient?: Schema.Types.ObjectId;
}

export type IMessageModel = Model<IMessageFields, unknown, unknown>;

export interface IActiveConnections {
	[id: string]: WebSocket;
}

export enum IMessageType {
	login = 'LOGIN',
	logout = 'LOGOUT',
	newMessage = 'NEW_MESSAGE',
	sendMessage = 'SEND_MESSAGE',
	deleteMessage = 'DELETE_MESSAGE',
	personalMessage = 'SEND_PERSONAL_MESSAGE',
}

export interface IMessagePayload {
	_id: string;
	token: string;
	message: string;
	createdAt: string;
	recipient?: string;
}

export interface IMessage {
	type: IMessageType;
	payload: IMessagePayload;
}
