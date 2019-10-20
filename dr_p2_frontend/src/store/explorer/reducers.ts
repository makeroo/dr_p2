import { ExplorerState, ExplorerActionTypes, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG } from "./types";

const initialState : ExplorerState = {
    page: 0,
    addDialog: false
}

export function explorerReducer (
    state = initialState,
    action: ExplorerActionTypes
): ExplorerState {
    switch (action.type) {
        case SOLUTIONS_SELECT_PAGE:
            return {
                ...state,
                page: action.page
            }

        case SOLUTIONS_ADD_DIALOG:
            return {
                ...state,
                addDialog: action.open
            }

        default:
            return state
    }
}