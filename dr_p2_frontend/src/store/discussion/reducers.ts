import { DiscussionState, DiscussionActionTypes,
    CREATE_PROBLEM, CREATING_PROBLEM, LOAD_DISCUSSION, ADD_THESIS, WORKING_ON_DISCUSSION, DISCUSSION_READY, ADD_RELATION, ADD_VOTE,
} from './types'
import { indexDiscussion, addRelation, newVoteSummary } from './utils'

const initialState : DiscussionState = {
    loading: false
}

export function discussionReducer (
    state = initialState,
    action: DiscussionActionTypes
): DiscussionState {
    switch (action.type) {
        case CREATE_PROBLEM:
            const { id, question } = action
            let d = {
                id,
                question,
                theses: [],
                relations: []
            }

            return {
                loading: false,
                id,
                question,
                indexedDiscussion: indexDiscussion(d, null)
            }

        case CREATING_PROBLEM:
            return {
                loading: true
            }

        case LOAD_DISCUSSION:
            return {
                ...state,
                loading: false,
                id: action.discussion.id,
                question: action.discussion.question,
                indexedDiscussion: indexDiscussion(action.discussion, action.voting),
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

        case ADD_THESIS: {
            const { indexedDiscussion } = state

            if (indexedDiscussion) {
                let voted_thesis = {
                    thesis: action.thesis,
                    vote: newVoteSummary(action.thesis.id)
                }

                let theses_index = {
                    ...indexedDiscussion.theses
                }

                theses_index[action.thesis.id] = voted_thesis

                let solutions, unbindedTheses;

                if (action.thesis.solution) {
                    solutions = [
                        ...indexedDiscussion.solutions,
                        voted_thesis
                    ]
                    unbindedTheses = indexedDiscussion.unbindedTheses
                } else {
                    solutions = indexedDiscussion.solutions
                    unbindedTheses = {
                        ...indexedDiscussion.unbindedTheses,
                    }

                    unbindedTheses[action.thesis.id] = voted_thesis
                }

                return {
                    ...state,
                    indexedDiscussion: {
                        ...indexedDiscussion,
                        theses: theses_index,
                        solutions,
                        unbindedTheses,
                    }
                }
            } else {
                // cannot happen
                return state
            }
        }
        case ADD_RELATION: {
            const { indexedDiscussion } = state

            if (indexedDiscussion) {
                let [updated, r] = addRelation(indexedDiscussion, action.relation)

                if (r) {
                    return {
                        ...state,
                        indexedDiscussion: updated
                    }
                } else {
                    return state
                }

            } else {
                // cannot happen
                return state
            }
        }
        case ADD_VOTE: {
            const { indexedDiscussion } = state

            if (indexedDiscussion !== undefined) {
                const { votedThesis } = action
                let theses = { ...indexedDiscussion.theses }

                theses[votedThesis.thesis.id] = votedThesis

                return {
                    ...state,
                    indexedDiscussion: {
                        ...indexedDiscussion,
                        theses
                    }
                }
            } else {
                // cannot happen
                return state
            }
        }
        default:
            return state
    }
}
