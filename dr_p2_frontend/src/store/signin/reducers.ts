import { SignInState, REQUEST_PATH, SignInActionTypes } from './types'

const initialState : SignInState = {
    requestedPath: ''
}

export function signInReducer (
    state = initialState,
    action: SignInActionTypes
): SignInState {
    switch (action.type) {
        case REQUEST_PATH:
            return {
                requestedPath: action.path
            }

        default:
            return state
    }
}
