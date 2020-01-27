import { AppServices } from "../services";
import {
    createProblem,
    creatingProblem,
    loadDiscussion,
    workingOnDiscussion,
    discussionReady,
    addThesis,
    addRelation,
    addVote,
    newProblem,
    getDiscussion,
    postThesis,
    postRelation,
    postVote
} from "../store/discussion/actions"

const configureDiscussionActions = (services: AppServices) => {
    return {
        createProblem,
        creatingProblem,
        loadDiscussion,
        workingOnDiscussion,
        discussionReady,
        addThesis,
        addRelation,
        addVote,
        newProblem: newProblem(services.discussionService),
        getDiscussion: getDiscussion(services.discussionService),
        postThesis: postThesis(services.discussionService),
        postRelation: postRelation(services.discussionService),
        postVote: postVote(services.discussionService)
    }
}

export default configureDiscussionActions
