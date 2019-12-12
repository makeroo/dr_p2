import AuthenticationService from "./AuthenticationService";
import DiscussionService from "./DiscussionService";

//export const AppContext = React.createContext(appServices)

const configureServices = async () => {
    const authenticationService = new AuthenticationService()

    const discussionService = new DiscussionService()

    return {
        authenticationService,
        discussionService,
    }
}

export default configureServices
export type AppServices = {
    authenticationService: AuthenticationService,
    discussionService: DiscussionService
}
