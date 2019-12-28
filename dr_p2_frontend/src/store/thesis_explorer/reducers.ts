import { ThesisExplorerState, ThesisExplorerActionTypes, SET_REFERENCE_THESIS, SELECT_PAGE } from "./types";

const initialState : ThesisExplorerState = {
    //referenceThesis: null,
    page: 0,
    /*related: {
        unrelatedTheses: [],
        supportingTheses: [],
        supportedTheses: [],
        contradictingTheses: []
    }*/
}

export function thesisExplorerReducer (
    state = initialState,
    action: ThesisExplorerActionTypes
) : ThesisExplorerState {
    switch (action.type) {
        case SET_REFERENCE_THESIS:
            return {
                ...state,
                referenceThesis: action.thesis
            }

        case SELECT_PAGE:
            return {
                ...state,
                page: action.page
            }
        default:
            return state
    }
}