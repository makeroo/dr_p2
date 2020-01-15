import { VotedThesis } from "../discussion/types"

export const SOLUTIONS_SELECT_PAGE = 'SOLUTIONS_SELECT_PAGE'
export const SOLUTIONS_ADD_DIALOG = 'SOLUTIONS_ADD_DIALOG'
export const PIN_THESIS = 'PIN_THESIS'

export enum AddDialogType {
    None,
    Solution,
    Thesis,
    SupportToSolution,
    RelationBetweenTheses,
}

export interface SolutionsSelectPageAction {
    type: typeof SOLUTIONS_SELECT_PAGE
    page: number
}

export interface SolutionsAddDialogAction {
    type: typeof SOLUTIONS_ADD_DIALOG
    addDialogType: AddDialogType
    solution: VotedThesis | null
    canAddSupport: boolean
    canAddContradiction: boolean
}

export interface PinThesis {
    type: typeof PIN_THESIS
    thesis: VotedThesis | null
}

export type DiscussionExplorerActionTypes = SolutionsSelectPageAction | SolutionsAddDialogAction | PinThesis

export interface DiscussionExplorerActions {
    solutionsSelectPage (page: number) : SolutionsSelectPageAction
    closeAddDialog () : SolutionsAddDialogAction
    addSolutionDialog () : SolutionsAddDialogAction
    addThesisDialog () : SolutionsAddDialogAction
    supportToSolutionDialog (solution: VotedThesis) : SolutionsAddDialogAction
    relationBetweenThesesDialog (thesis: VotedThesis, canAddSupport: boolean, canAddContradiction: boolean) : SolutionsAddDialogAction
    pinThesis (thesis: VotedThesis | null) : PinThesis
}

export interface DiscussionExplorerState {
    // "view configuration" properties (eg. fetched from query string, see dev_query_string branch)
    page: number
    pinnedThesis: VotedThesis | null

    addDialogType: AddDialogType
    tappedThesis: VotedThesis | null
    canAddSupport: boolean
    canAddContradiction: boolean
}
