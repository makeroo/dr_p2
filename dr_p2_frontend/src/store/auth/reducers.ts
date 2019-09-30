import { AuthState, DECLARE_NAME, AuthActionTypes } from './types'

const initialState : AuthState = {
    loggedIn: false,
    //userName: null
};

export function authReducer (
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch (action.type) {
        case DECLARE_NAME:
            return {
                loggedIn: true,
                userName: action.name
             };
    
        default:
            return state;
    }
}
