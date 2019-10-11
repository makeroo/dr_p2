import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { CreateProblemAction, CreatingProblemAction, LoadDiscussionAction, CREATE_PROBLEM, CREATING_PROBLEM, LOAD_DISCUSSION, Discussion } from './types'

export function createProblem(id: number, question: string): CreateProblemAction {
    return {
        type: CREATE_PROBLEM,
        id,
        question
    }
}

export function creatingProblem(): CreatingProblemAction {
    return {
        type: CREATING_PROBLEM
    }
}

export function loadDiscussion(discussion: Discussion): LoadDiscussionAction {
    return {
        type: LOAD_DISCUSSION,
        discussion
    }
}

export const newProblem = (question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<number> => {
        dispatch(creatingProblem())

        return new Promise<number>((resolve) => {
            setTimeout(() => {
                const action = createProblem(1, question)

                dispatch(action)

                resolve(action.id)
            }, 1000)
        })
    }
}

export const getDiscussion = (id: number): ThunkAction<Promise<Discussion>, LoadDiscussionAction, Discussion, LoadDiscussionAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Discussion> => {
        dispatch(creatingProblem())
 
        return new Promise<Discussion>((resolve) => {
            setTimeout(() => {
                const discussion = {
                    id: id,
                    question: 'ci stiamo dentro?',
                    theses: [],
                    relations: []
                }

                dispatch(loadDiscussion(discussion))

                resolve(discussion)
            }, 1000)
        })
    }
}
