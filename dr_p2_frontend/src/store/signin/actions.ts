import { SignInActionTypes, REQUEST_PATH } from './types'

export function requestPath(path: string): SignInActionTypes {
    return {
        type: REQUEST_PATH,
        path
    }
}
