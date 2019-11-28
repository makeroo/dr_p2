import { DiscussionState, DiscussionActionTypes,
    CREATE_PROBLEM, CREATING_PROBLEM, LOAD_DISCUSSION, LOAD_VOTING, ADD_THESIS, WORKING_ON_DISCUSSION, DISCUSSION_READY, ADD_RELATION,
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
            let d = {
                id: action.id,
                question: action.question,
                theses: [],
                relations: []
            }
            return {
                loading: false,
                discussion: d,
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
                discussion: action.discussion,
                indexedDiscussion: indexDiscussion(action.discussion, state.voting || null),
            }

        case LOAD_VOTING:
            if (!state.discussion) {
                return state
            }

            return {
                ...state,
                loading: false,
                voting: action.voting,
                indexedDiscussion: indexDiscussion(state.discussion, action.voting)
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
            const discussion = state.discussion
            const indexedDiscussion = state.indexedDiscussion

            if (discussion && indexedDiscussion) {
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
            const discussion = state.discussion
            const indexedDiscussion = state.indexedDiscussion

            if (discussion && indexedDiscussion) {
                let [updated, r] = addRelation(indexedDiscussion, action.relation)

                if (r) {
                    let relations = [...discussion.relations]

                    relations.push(action.relation)

                    return {
                        ...state,
                        discussion: {
                            ...discussion,
                            relations
                        },
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
        default:
            return state
    }
}
