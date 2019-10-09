import { DiscussionState, CREATE_PROBLEM, DiscussionActionTypes } from './types'

const initialState : DiscussionState = {
    id: 0,
    question: '',
    theses: [],
    relations: []
}

export function discussionReducer (
    state = initialState,
    action: DiscussionActionTypes
): DiscussionState {
    switch (action.type) {
        case CREATE_PROBLEM:
            return {
                id: action.id,
                question: action.question,
                theses: [],
                relations: []
            }

        default:
            return state
    }
}
