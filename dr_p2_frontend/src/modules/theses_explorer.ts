import { AppServices } from "../services";
import {
    setReferenceThesis,
    selectPage
} from "../store/thesis_explorer/actions"

const configureThesesExplorerActions = (services: AppServices) => {
    return {
        setReferenceThesis,
        selectPage
    }
}

export default configureThesesExplorerActions
