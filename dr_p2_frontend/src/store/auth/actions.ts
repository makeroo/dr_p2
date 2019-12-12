import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import { QueryState, DeclareNameAction, PendingRequestAction, NotLoggedInAction, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN } from './types'
//import { AppState } from '..'
import AuthenticationService from '../../services/AuthenticationService'

export function declareName(name: string): DeclareNameAction {
    return {
        type: DECLARE_NAME,
        name
    }
}

export function pendingRequest(state: QueryState): PendingRequestAction {
    return {
        type: PENDING_REQUEST,
        state
    }
}

export function notLoggedIn(): NotLoggedInAction {
    return {
        type: NOT_LOGGED_IN
    }
}

export const login = (authenticationService: AuthenticationService) => (username: string): ThunkAction<Promise<number>, any, string, DeclareNameAction> => {
    // Invoke API
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<number> => {
        dispatch(pendingRequest(QueryState.signingIn))

        return authenticationService.login(username).then((userId) => {
            dispatch(declareName(username))

            return userId
        })
    }
}

export const getSessionUser = (authenticationService: AuthenticationService) => () : ThunkAction<Promise<string>, any, string, PendingRequestAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction> /*, getState: () => AppState*/): Promise<string> => {
        dispatch(pendingRequest(QueryState.checkingSession))

        return authenticationService.getSessionUser().then((username) => {
            dispatch(declareName(username))

            return username
        }).catch((error) => {
            console.debug('not logged in:', error)

            dispatch(notLoggedIn())

            throw error
        })
    }
}
