import {
    AddDialogType,
    SolutionsSelectPageAction, SolutionsAddDialogAction, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG, PinThesis, PIN_THESIS
} from "./types";
import { VotedThesis } from "../discussion/types";

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
        solution: null,
        canAddSupport: false,
        canAddContradiction: false
    }
}
export function addSolutionDialog () : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.Solution,
        solution: null,
        canAddSupport: false,
        canAddContradiction: false
    }
}

export function addThesisDialog () : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.Thesis,
        solution: null,
        canAddSupport: false,
        canAddContradiction: false
    }
}

export function supportToSolutionDialog (solution: VotedThesis) : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.SupportToSolution,
        solution,
        canAddSupport: false,
        canAddContradiction: false
    }
}

export function relationBetweenThesesDialog (thesis: VotedThesis, canAddSupport: boolean, canAddContradiction: boolean) {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        addDialogType: AddDialogType.RelationBetweenTheses,
        solution: thesis,
        canAddSupport,
        canAddContradiction
    }
}

export function pinThesis (thesis: VotedThesis | null) : PinThesis {
    return {
        type: PIN_THESIS,
        thesis
    }
}
