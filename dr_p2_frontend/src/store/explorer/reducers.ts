import { ExplorerState, ExplorerActionTypes, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG, AddDialogType } from "./types";

const initialState : ExplorerState = {
    page: 0,
    addDialogType: AddDialogType.None
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
                addDialogType: action.addDialogType
            }

        default:
            return state
    }
}