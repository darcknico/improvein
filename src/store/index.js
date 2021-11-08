import {createStore, combineReducers, applyMiddleware} from 'redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit';
import authSlice, {AuthState} from '@store/slices/auth.slice';

const rootReducer = combineReducers({
    auth: authSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
  

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}),
});
export interface RootState {
    auth: AuthState;
}

export const persistor = persistStore(store);

export default store;
