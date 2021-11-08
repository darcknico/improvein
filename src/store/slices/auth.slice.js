import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {User} from '@app/models/auth';

export interface AuthState{
    user: User,
    token: string,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: {
            name: 'Alexander Pierce',
            email: '',
        }
    },
    reducers: {
        login: (state,action) => {
            state.isAuthenticated = true;
            state.user = {
                ...state.user,
                ...action.payload,
            }
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
    },
});



export const { login, logout } = authSlice.actions;

export default authSlice.reducer