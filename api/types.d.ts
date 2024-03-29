import { WebSocket } from 'ws';
import { Document, Model, Schema } from 'mongoose';
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
	isPersonal: boolean;
	recipient?: Schema.Types.ObjectId;
}

export type IMessageModel = Model<IMessageFields, unknown, unknown>;

export interface IActiveConnections {
	id: string;
	ws: WebSocket;
	user?: Document<IUserFields, IUserModel, IUserMethods>;
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
	payload:
		| Document[]
		| (Document<IUserFields, IUserModel, IUserMethods> | undefined)[]
		| Promise<
				| (Document<unknown, unknown, IUserFields> &
						Omit<IUserFields & { _id: ObjectId }, keyof IUserMethods> &
						IUserMethods)
				| null
		  >[];
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
