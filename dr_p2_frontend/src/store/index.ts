import { combineReducers, createStore } from 'redux'

import { authReducer } from './auth/reducers'

const rootReducer = combineReducers({
    auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
