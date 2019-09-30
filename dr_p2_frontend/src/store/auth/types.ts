export interface AuthState {
    loggedIn: boolean
    userName?: string
}

export const DECLARE_NAME = 'DECLARE_NAME'

interface DeclareNameAction {
    type: typeof DECLARE_NAME
    name: string
}

export type AuthActionTypes = DeclareNameAction
