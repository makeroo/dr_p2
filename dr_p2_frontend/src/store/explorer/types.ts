export const PREV_SOLUTION_PAGE = 'PREV_SOLUTION_PAGE'
export const NEXT_SOLUTION_PAGE = 'NEXT_SOLUTION_PAGE'

export interface PrevSolutionPageAction {
    type: typeof PREV_SOLUTION_PAGE
}

export interface NextSolutionPageAction {
    type: typeof NEXT_SOLUTION_PAGE
}

export type ExplorerActionTypes = PrevSolutionPageAction | NextSolutionPageAction

export interface ExplorerState {
    page: number
}
