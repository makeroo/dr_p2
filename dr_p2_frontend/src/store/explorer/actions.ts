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

export function closeAddDialog () : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.None,
        solution: null
    }
}
export function addSolutionDialog () : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.Solution,
        solution: null
    }
}

export function addThesisDialog () : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.Thesis,
        solution: null
    }
}

export function supportToSolutionDialog (solution: Thesis) : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.SupportToSolution,
        solution
    }
}

export function pinThesis (thesis: Thesis | null) : PinThesis {
    return {
        type: PIN_THESIS,
        thesis
    }
}
