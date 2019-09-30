import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { AuthActionTypes, DECLARE_NAME } from './types'

export function declareName(name: string): AuthActionTypes {
    return {
        type: DECLARE_NAME,
        name
    }
}

export const login = (username: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            //dispatch(isFetching(true))
            console.log('Login in progress')
            setTimeout(() => {
                dispatch(declareName(username))

                resolve()

                /*setTimeout(() => {
                    dispatch(isFetching(false))
                    console.log('Login done')
                    resolve()
                }, 1000)*/
            }, 2000)
      })
    }
}
