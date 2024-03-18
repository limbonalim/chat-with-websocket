import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { IMessagePayload, IPayloadUser } from '../../types';

interface chatState {
	messages: IMessagePayload[];
	users: IPayloadUser[];
}

const initialState: chatState = {
	messages: [],
	users: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		getMessages: (
			state,
			{ payload: messages }: PayloadAction<IMessagePayload[]>,
		) => {
			state.messages = messages;
		},
		getUsers: (state, { payload: users }: PayloadAction<IPayloadUser[]>) => {
			state.users = users;
		},
	},
});

export const selectMessages = (state: RootState) => state.chat.messages;
export const selectUsers = (state: RootState) => state.chat.users;

export const { getMessages, getUsers } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
