import { AppServices } from "../services"
import configureAuthActions from "./auth"
import configureDiscussionActions from "./discussion"
import configureDiscussionExplorerActions from "./discussion_explorer"


const configureActions = async (services: AppServices) => {
    const auth = configureAuthActions(services)
    const discussion = configureDiscussionActions(services)
    const discussion_explorer = configureDiscussionExplorerActions(services)

    return {
        auth,
        discussion,
        discussion_explorer,
    }
}

export default configureActions
