import { AuthActionTypes, DECLARE_NAME } from './types'

export function declareName(name: string): AuthActionTypes {
    return {
        type: DECLARE_NAME,
        name
    }
}
