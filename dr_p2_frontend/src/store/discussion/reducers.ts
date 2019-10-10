import { DiscussionState, CREATE_PROBLEM, CREATING_PROBLEM, DiscussionActionTypes } from './types'

const initialState : DiscussionState = {
    loading: false
}

export function discussionReducer (
    state = initialState,
    action: DiscussionActionTypes
): DiscussionState {
    switch (action.type) {
        case CREATE_PROBLEM:
            return {
                loading: false,
                discussion: {
                    id: action.id,
                    question: action.question,
                    theses: [],
                    relations: []
                }
            }

        case CREATING_PROBLEM:
            return {
                loading: true
            }

            default:
            return state
    }
}