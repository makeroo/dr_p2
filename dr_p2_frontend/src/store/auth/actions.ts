import { QueryState, DeclareNameAction, PendingRequestAction, NotLoggedInAction, DECLARE_NAME, PENDING_REQUEST, NOT_LOGGED_IN } from './types'

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
