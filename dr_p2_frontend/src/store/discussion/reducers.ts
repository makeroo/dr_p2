import { DiscussionState, CREATE_PROBLEM, CREATING_PROBLEM, LOAD_DISCUSSION, DiscussionActionTypes } from './types'
import { indexDiscussion } from './utils'

const initialState : DiscussionState = {
    loading: false
}

export function discussionReducer (
    state = initialState,
    action: DiscussionActionTypes
): DiscussionState {
    switch (action.type) {
        case CREATE_PROBLEM:
            let d = {
                id: action.id,
                question: action.question,
                theses: [],
                relations: []
            }
            return {
                loading: false,
                discussion: d,
                indexedDiscussion: indexDiscussion(d)
            }

        case CREATING_PROBLEM:
            return {
                loading: true
            }

        case LOAD_DISCUSSION:
            return {
                loading: false,
                discussion: action.discussion,
                indexedDiscussion: indexDiscussion(action.discussion),
            }

        default:
            return state
    }
}
