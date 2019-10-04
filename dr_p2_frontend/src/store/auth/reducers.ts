import { AuthState, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes } from './types'

const initialState : AuthState = {
    // workflow: querytodo -> queryrunning -> loggedin / notloggedin
    // feedback:      loading                 req page / welcome page
    // state:    l.ing:T/pr:U l.ing:T/pr:D    l.ing:F un:U  / l.ing:F un:D

    loading: true,
    loggedIn: false,
    //userName: undefined
    //sessionUser: undefined
};

export function authReducer (
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case DECLARE_NAME:
            return {
                loading: false,
                loggedIn: true,
                userName: action.name
            }

        case PENDING_REQUEST:
            return {
                loading: true,
                loggedIn: false,
                sessionUser: action.promise
            }

        case NOT_LOGGED_IN:
            return {
                loading: false,
                loggedIn: false
            }

        default:
            return state
    }
}
