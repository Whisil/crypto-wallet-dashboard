import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { AuthAppState } from 'src/redux/types';

import authReducer from './auth';

const rootPersistConfig = {
	key: 'root',
	storage: sessionStorage
};

export interface RootState {
	authReducer: AuthAppState;
}

const rootReducer = combineReducers({
	authReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
