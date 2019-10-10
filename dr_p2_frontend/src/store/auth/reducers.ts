import { QueryState, AuthState, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN, AuthActionTypes } from './types'


const initialState : AuthState = {
    // workflow: querytbd -> queryrunning -> loggedin / notloggedin
    // feedback:        loading              req page / welcome page
    // state:    l.ing:T/pr:U l.ing:T/pr:D    l.ing:F un:U  / l.ing:F un:D

    state: QueryState.setup,
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
                state: QueryState.done,
                loggedIn: true,
                userName: action.name
            }

        case PENDING_REQUEST:
            return {
                state: action.state,
                loggedIn: false,
                sessionUser: action.promise
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
