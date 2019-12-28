import { AppServices } from "../services"
import configureAuthActions from "./auth"
import configureDiscussionActions from "./discussion"
import configureDiscussionExplorerActions from "./discussion_explorer"
import configureThesesExplorerActions from "./theses_explorer"


const configureActions = async (services: AppServices) => {
    const auth = configureAuthActions(services)
    const discussion = configureDiscussionActions(services)
    const discussion_explorer = configureDiscussionExplorerActions(services)
    const theses_explorer = configureThesesExplorerActions(services)

    return {
        auth,
        discussion,
        discussion_explorer,
        theses_explorer,
    }
}

export default configureActions
