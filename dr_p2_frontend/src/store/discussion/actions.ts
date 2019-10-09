import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { CreateProblemAction, CREATE_PROBLEM } from './types'

export function createProblem(id: number, question: string): CreateProblemAction {
    return {
        type: CREATE_PROBLEM,
        id,
        question
    }
}

export const newProblem = (question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<number> => {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                const action = createProblem(1, question)

                dispatch(action)

                resolve(action.id)
            })
        })
    }
}
