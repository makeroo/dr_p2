import { AppServices } from "../services";
import {
    createProblem,
    creatingProblem,
    loadDiscussion,
    loadVoting,
    workingOnDiscussion,
    discussionReady,
    addThesis,
    addRelation,
    newProblem,
    getDiscussion,
    getVoting,
    postThesis,
    postRelation
} from "../store/discussion/actions"

const configureDiscussionActions = (services: AppServices) => {
    return {
        createProblem,
        creatingProblem,
        loadDiscussion,
        loadVoting,
        workingOnDiscussion,
        discussionReady,
        addThesis,
        addRelation,
        newProblem: newProblem(services.discussionService),
        getDiscussion: getDiscussion(services.discussionService),
        getVoting: getVoting(services.discussionService),
        postThesis: postThesis(services.discussionService),
        postRelation: postRelation(services.discussionService)
    }
}

export default configureDiscussionActions
