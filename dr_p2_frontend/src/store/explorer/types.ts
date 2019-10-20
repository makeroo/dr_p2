export const SOLUTIONS_SELECT_PAGE = 'SOLUTIONS_SELECT_PAGE'
export const SOLUTIONS_ADD_DIALOG = 'SOLUTIONS_ADD_DIALOG'

export interface SolutionsSelectPageAction {
    type: typeof SOLUTIONS_SELECT_PAGE
    page: number
}

export interface SolutionsAddDialogAction {
    type: typeof SOLUTIONS_ADD_DIALOG
    open: boolean
}

export type ExplorerActionTypes = SolutionsSelectPageAction | SolutionsAddDialogAction

export interface ExplorerState {
    page: number
    addDialog: boolean
}
