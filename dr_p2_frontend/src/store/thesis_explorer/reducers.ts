import { ThesisExplorerState, ThesisExplorerActionTypes, SET_REFERENCE_THESIS } from "./types";

const initialState : ThesisExplorerState = {
    referenceThesis: null
}

export function thesisExplorerReducer (
    state = initialState,
    action: ThesisExplorerActionTypes
) {
    switch (action.type) {
        case SET_REFERENCE_THESIS:
            return {
                ...state,
                referenceThesis: action.thesis
            }

        default:
            return state
    }
}