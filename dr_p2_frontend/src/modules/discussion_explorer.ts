import { AppServices } from "../services";
import {
    solutionsSelectPage,
    closeAddDialog,
    addSolutionDialog,
    addThesisDialog,
    supportToSolutionDialog,
    relationBetweenThesesDialog,
    pinThesis
} from "../store/discussion_explorer/actions"

const configureDiscussionExplorerActions = (services: AppServices) => {
    return {
        solutionsSelectPage,
        closeAddDialog,
        addSolutionDialog,
        addThesisDialog,
        supportToSolutionDialog,
        relationBetweenThesesDialog,
        pinThesis
    }
}

export default configureDiscussionExplorerActions
