import { WebSocket } from 'ws';
import { Model, Schema } from 'mongoose';
import { IMessageType } from './router/chat';

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

export interface IMessagePayload {
	_id?: string;
	token: string;
	message?: string;
	createdAt?: string;
	recipient?: string;
}

export interface IMessage {
	type: IMessageType;
	payload: IMessagePayload;
}
