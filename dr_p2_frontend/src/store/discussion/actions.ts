import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { CreateProblemAction, CreatingProblemAction, CREATE_PROBLEM, CREATING_PROBLEM } from './types'

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
