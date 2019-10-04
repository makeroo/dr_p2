import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { DeclareNameAction, PendingRequestAction, NotLoggedInAction, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes, AuthState } from './types'

export function declareName(name: string): DeclareNameAction {
    return {
        type: DECLARE_NAME,
        name
    }
}

export function pendingRequest(promise: Promise<AuthActionTypes>): PendingRequestAction {
    return {
        type: PENDING_REQUEST,
        promise
    }
}

export function notLoggedIn(): NotLoggedInAction {
    return {
        type: NOT_LOGGED_IN
    }
}

export const login = (username: string): ThunkAction<Promise<AuthActionTypes>, DeclareNameAction, string, DeclareNameAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<AuthActionTypes> => {
        return new Promise<AuthActionTypes>((resolve) => {
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

export const getSessionUser = (auth: AuthState) : ThunkAction<Promise<AuthActionTypes>, PendingRequestAction, string, PendingRequestAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<AuthActionTypes> => {
        if (auth.sessionUser !== undefined) {
            return auth.sessionUser
        }

        let p = new Promise<AuthActionTypes>((resolve) => {
            console.log('sessionUser request in progress')
            setTimeout(() => {
                dispatch(notLoggedIn())
            })
        })

        dispatch(pendingRequest(p))

        return p
    }
}
