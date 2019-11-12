import { DiscussionExplorerState, DiscussionExplorerActionTypes, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG, AddDialogType, PIN_THESIS } from "./types";

const initialState : DiscussionExplorerState = {
    page: 0,
    addDialogType: AddDialogType.None,
    pinnedThesis: null,
    tappedThesis: null,
    canAddSupport: false,
    canAddContradiction: false,
}

export function discussionExplorerReducer (
    state = initialState,
    action: DiscussionExplorerActionTypes
): DiscussionExplorerState {
    switch (action.type) {
        case SOLUTIONS_SELECT_PAGE:
            return {
                ...state,
                page: action.page
            }

        case SOLUTIONS_ADD_DIALOG:
            return {
                ...state,
                addDialogType: action.addDialogType,
                tappedThesis: action.solution,
                canAddSupport: action.canAddSupport,
                canAddContradiction: action.canAddContradiction
            }

        case PIN_THESIS:
            return {
                ...state,
                pinnedThesis: action.thesis
            }
        default:
            return state
    }
}