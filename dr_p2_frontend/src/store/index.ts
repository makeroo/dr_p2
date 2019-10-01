import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthState } from './auth/types'
import { authReducer } from './auth/reducers'
import { SignInState } from './signin/types'
import { signInReducer} from './signin/reducers'

interface RootState {
    auth: AuthState
    signIn: SignInState
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    signIn: signInReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
