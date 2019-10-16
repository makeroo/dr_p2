import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthState } from './auth/types'
import { authReducer } from './auth/reducers'
import { DiscussionState } from './discussion/types'
import { discussionReducer} from './discussion/reducers'
import { ExplorerState } from './explorer/types'
import { explorerReducer } from './explorer/reducers'

export interface RootState {
    auth: AuthState
    discussion: DiscussionState
    explorer: ExplorerState
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    discussion: discussionReducer,
    explorer: explorerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
