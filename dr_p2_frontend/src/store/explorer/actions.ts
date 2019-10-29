import {
    AddDialogType,
    SolutionsSelectPageAction, SolutionsAddDialogAction, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG, PinThesis, PIN_THESIS
} from "./types";
import { Thesis } from "../discussion/types";

export function solutionsSelectPage (page: number) : SolutionsSelectPageAction {
    return {
        type: SOLUTIONS_SELECT_PAGE,
        page
    }
}

export function addDialog (addDialogType: AddDialogType) : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType
    }
}

export function pinThesis (thesis: Thesis | null) : PinThesis {
    return {
        type: PIN_THESIS,
        thesis
    }
}
