import { Action } from 'redux'

export interface SignInState {
    requestedPath: string
}

export const REQUEST_PATH = 'REQUEST_PATH'

export interface RequestPathAction extends Action<typeof REQUEST_PATH> {
    path: string
}

export type SignInActionTypes = RequestPathAction
