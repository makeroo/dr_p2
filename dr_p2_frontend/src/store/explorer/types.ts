import { Thesis } from "../discussion/types"

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
    solution: Thesis | null
    canAddSupport: boolean
    canAddContradiction: boolean
}

export interface PinThesis {
    type: typeof PIN_THESIS
    thesis: Thesis | null
}

export type ExplorerActionTypes = SolutionsSelectPageAction | SolutionsAddDialogAction | PinThesis

export interface ExplorerState {
    page: number
    addDialogType: AddDialogType
    pinnedThesis: Thesis | null
    tappedThesis: Thesis | null
    canAddSupport: boolean
    canAddContradiction: boolean
}
