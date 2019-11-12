import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthState } from './auth/types'
import { authReducer } from './auth/reducers'
import { DiscussionState } from './discussion/types'
import { discussionReducer} from './discussion/reducers'
import { DiscussionExplorerState } from './discussion_explorer/types'
import { discussionExplorerReducer } from './discussion_explorer/reducers'

export interface RootState {
    auth: AuthState
    discussion: DiscussionState
    discussion_explorer: DiscussionExplorerState
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    discussion: discussionReducer,
    discussion_explorer: discussionExplorerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
