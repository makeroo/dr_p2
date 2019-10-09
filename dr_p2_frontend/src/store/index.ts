import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthState } from './auth/types'
import { authReducer } from './auth/reducers'
import { DiscussionState } from './discussion/types'
import { discussionReducer} from './discussion/reducers'

export interface RootState {
    auth: AuthState
    discussion: DiscussionState
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    discussion: discussionReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
