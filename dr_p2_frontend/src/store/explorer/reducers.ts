import { ExplorerState, ExplorerActionTypes, PREV_SOLUTION_PAGE, NEXT_SOLUTION_PAGE } from "./types";

const initialState : ExplorerState = {
    page: 0
}

export function explorerReducer (
    state = initialState,
    action: ExplorerActionTypes
): ExplorerState {
    switch (action.type) {
        case PREV_SOLUTION_PAGE:
            return {
                page: state.page - 1,
                ...state
            }

        case NEXT_SOLUTION_PAGE:
            return {
                page: state.page + 1,
                ...state
            }

        default:
            return state
    }
}