import { QueryState, AuthState, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes } from './types'


const initialState : AuthState = {
    // workflow: querytbd -> queryrunning -> loggedin / notloggedin
    // feedback:        loading              req page / welcome page
    // state:            s:CS                s:D un:U  / S:D un:D

    state: QueryState.checkingSession,
    loggedIn: false,
    //userName: undefined
};

export function authReducer (
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case DECLARE_NAME:
            return {
                state: QueryState.done,
                loggedIn: true,
                userName: action.name
            }

        case PENDING_REQUEST:
            return {
                state: action.state,
                loggedIn: false,
            }

        case NOT_LOGGED_IN:
            return {
                state: QueryState.done,
                loggedIn: false
            }

        default:
            return state
    }
}
