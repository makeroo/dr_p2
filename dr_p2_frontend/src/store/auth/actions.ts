import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { QueryState, DeclareNameAction, PendingRequestAction, NotLoggedInAction, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes, AuthState } from './types'

export function declareName(name: string): DeclareNameAction {
    return {
        type: DECLARE_NAME,
        name
    }
}

export function pendingRequest(promise: Promise<AuthActionTypes>, state: QueryState): PendingRequestAction {
    return {
        type: PENDING_REQUEST,
        promise,
        state
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
        let p = new Promise<AuthActionTypes>((resolve) => {
            //console.log('Login in progress')

            setTimeout(() => {
                dispatch(declareName(username))

                resolve()
            }, 2000)
      })

      dispatch(pendingRequest(p, QueryState.signingIn))

      return p
    }
}

export const getSessionUser = (auth: AuthState) : ThunkAction<Promise<AuthActionTypes>, PendingRequestAction, string, PendingRequestAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<AuthActionTypes> => {
        if (auth.sessionUser !== undefined) {
            return auth.sessionUser
        }

        let p = new Promise<AuthActionTypes>((resolve) => {
            //console.log('sessionUser request in progress')

            setTimeout(() => {
                dispatch(notLoggedIn())
            })
        })

        dispatch(pendingRequest(p, QueryState.setup))

        return p
    }
}
