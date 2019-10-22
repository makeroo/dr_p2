import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { QueryState, DeclareNameAction, PendingRequestAction, NotLoggedInAction, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes } from './types'
import { AppState } from '..'

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

export const getSessionUser = () : ThunkAction<Promise<AuthActionTypes>, AppState, string, PendingRequestAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>, getState: () => AppState): Promise<AuthActionTypes> => {
        const state = getState()
        const auth = state.auth

        //console.log('getsess start', auth, new Date())

        if (auth.pendingRequest !== undefined) {
            return auth.pendingRequest
        }

        let p = new Promise<AuthActionTypes>((resolve) => {
            //console.log('pendingRequest request in progress')

            setTimeout(() => {
                //console.log('pendingRequest done')
                dispatch(notLoggedIn())
                //dispatch(declareName('pippo'))
            }, 500)
        })

        //console.log('pendingRequest defined')
        dispatch(pendingRequest(p, QueryState.checkingSession))

        return p
    }
}
