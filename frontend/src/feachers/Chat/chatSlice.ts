import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import type { IMessage } from '../../types';

interface chatState {
	messages: IMessage[];
}

const initialState: chatState = {
	messages: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		getMessages: (state, { payload: messages }: PayloadAction<IMessage[]>) => {
			state.messages = messages;
		},
		getOneMessage: (state, { payload: message }: PayloadAction<IMessage>) => {
			state.messages.push(message);
		},
	},
});

export const selectMessages = (state: RootState) => state.chat.messages;

export const { getMessages, getOneMessage } = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
