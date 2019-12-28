import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { AuthState } from './auth/types'
import { authReducer } from './auth/reducers'
import { DiscussionState } from './discussion/types'
import { discussionReducer} from './discussion/reducers'
import { DiscussionExplorerState } from './discussion_explorer/types'
import { discussionExplorerReducer } from './discussion_explorer/reducers'
import { thesisExplorerReducer } from './thesis_explorer/reducers'
import { ThesisExplorerState } from './thesis_explorer/types'

export interface RootState {
    auth: AuthState
    discussion: DiscussionState
    discussion_explorer: DiscussionExplorerState
    thesis_explorer: ThesisExplorerState
}

const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    discussion: discussionReducer,
    discussion_explorer: discussionExplorerReducer,
    thesis_explorer: thesisExplorerReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
