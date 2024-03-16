import { WebSocket } from 'ws';
import { Model, Schema } from 'mongoose';
import { IMessageType } from './router/chat';

export interface IUserFields {
	email: string;
	password: string;
	role: string;
	token: string;
	displayName: string;
	avatar?: string;
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

export interface IMessageOutputPayload {
	_id?: string;
	user: {
		displayName: string;
		avatar?: string;
	};
	message?: string;
	createdAt: string;
	recipient?: {
		displayName: string;
		avatar?: string;
	};
}

export interface IOutputMessage {
	type: IMessageType;
	payload: IMessageOutputPayload;
}

export interface IMessageComingPayload {
	user: string;
	message?: string;
	recipient?: string;
}

export interface IComingMessage {
	type: IMessageType;
	payload: IMessageComingPayload;
}
