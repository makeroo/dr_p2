import { AppServices } from "../services"
import configureAuthActions from "./auth"
import configureDiscussionActions from "./discussion"


const configureActions = async (services: AppServices) => {
    const auth = configureAuthActions(services)
    const discussion = configureDiscussionActions(services)

    return {
        auth,
        discussion,
    }
}

export default configureActions
