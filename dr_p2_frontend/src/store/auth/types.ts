export const DECLARE_NAME = 'DECLARE_NAME'
export const PENDING_REQUEST = 'PENDING_REQUEST'
export const NOT_LOGGED_IN = 'NOT_LOGGED_IN'

export interface DeclareNameAction {
    type: typeof DECLARE_NAME
    name: string
}

export interface PendingRequestAction {
    type: typeof PENDING_REQUEST
    state: QueryState
}

export interface NotLoggedInAction {
    type: typeof NOT_LOGGED_IN
}

export type AuthActionTypes = DeclareNameAction | PendingRequestAction | NotLoggedInAction

export enum QueryState {
    checkingSession,
    signingIn,
    done
}

export interface AuthState {
    state: QueryState
    loggedIn: boolean
    userName?: string
}
