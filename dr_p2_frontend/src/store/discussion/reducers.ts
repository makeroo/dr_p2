import { DiscussionState, DiscussionActionTypes,
    CREATE_PROBLEM, CREATING_PROBLEM, LOAD_DISCUSSION, ADD_THESIS, WORKING_ON_DISCUSSION, DISCUSSION_READY
} from './types'
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

        case WORKING_ON_DISCUSSION:
            return {
                ...state,
                loading: true
            }

        case DISCUSSION_READY:
                return {
                    ...state,
                    loading: false
                }

        case ADD_THESIS:
            const discussion = state.discussion
            const indexedDiscussion = state.indexedDiscussion

            if (discussion && indexedDiscussion) {
                let theses_index = {
                    ...indexedDiscussion.theses
                }

                theses_index[action.thesis.id] = action.thesis

                let solutions;

                if (action.thesis.solution) {
                    solutions = [
                        ...indexedDiscussion.solutions,
                        action.thesis
                    ]
                } else {
                    solutions = indexedDiscussion.solutions
                }

                return {
                    ...state,
                    discussion: {
                        ...discussion,
                        theses: [
                            ...discussion.theses,
                            action.thesis
                        ]
                    },
                    indexedDiscussion: {
                        ...indexedDiscussion,
                        theses: theses_index,
                        solutions
                    }
                }
            } else {
                // cannot happen
                return state
            }
        default:
            return state
    }
}
