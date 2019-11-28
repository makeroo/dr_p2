import { VotedThesis } from "../discussion/types";

export const SET_REFERENCE_THESIS = 'SET_REFERENCE_THESIS'

export interface SetReferenceThesis {
    type: typeof SET_REFERENCE_THESIS
    thesis: VotedThesis | null
}

export type ThesisExplorerActionTypes = SetReferenceThesis

export interface ThesisExplorerState {
    referenceThesis: VotedThesis | null
}
