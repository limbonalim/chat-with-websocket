import { IMessageType } from './constants.ts';

export interface IMyError {
	message: string;
}

export interface ValidationError {
	errors: {
		[key: string]: {
			name: string;
			message: string;
		};
	};
	message: string;
	name: string;
	_message: string;
}

export interface IRegisterForm {
	email: string;
	password: string;
	displayName: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IUser {
	_id: string;
	email: string;
	displayName: string;
	avatar?: string;
	role: string;
	token: string;
}

export type IPayloadUser = Pick<IUser, 'displayName', 'avatar'>;

export interface IMessagePayload {
	_id?: string;
	user: {
		displayName: string;
		avatar: string;
	};
	message?: string;
	createdAt: string;
	recipient?: {
		displayName: string;
		avatar: string;
	};
}

export interface IMessage {
	type: IMessageType;
	payload: IMessagePayload[] | IPayloadUser[] | string;
}
