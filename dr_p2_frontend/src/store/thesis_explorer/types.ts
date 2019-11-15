import { Thesis } from "../discussion/types";

export const SET_REFERENCE_THESIS = 'SET_REFERENCE_THESIS'

export interface SetReferenceThesis {
    type: typeof SET_REFERENCE_THESIS
    thesis: Thesis | null
}

export type ThesisExplorerActionTypes = SetReferenceThesis

export interface ThesisExplorerState {
    referenceThesis: Thesis | null
}
