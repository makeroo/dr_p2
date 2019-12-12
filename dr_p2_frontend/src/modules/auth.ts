import { AppServices } from "../services";

import {
    declareName,
    pendingRequest,
    notLoggedIn,
    login,
    getSessionUser,
} from "../store/auth/actions"

const configureAuthActions = (services: AppServices) => {
    return {
        declareName,
        pendingRequest,
        notLoggedIn,
        login: login(services.authenticationService),
        getSessionUser: getSessionUser(services.authenticationService)
    }
}

export default configureAuthActions
