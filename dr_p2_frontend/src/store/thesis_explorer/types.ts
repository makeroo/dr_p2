import { VotedThesis, ThesisRelation, ThesesIndex } from "../discussion/types";

export const SET_REFERENCE_THESIS = 'SET_REFERENCE_THESIS'
export const SELECT_PAGE = 'SELECT_PAGE'

export interface SetReferenceThesis {
    type: typeof SET_REFERENCE_THESIS
    thesis?: VotedThesis
}

export interface SelectPage {
    type: typeof SELECT_PAGE
    page: number
}

export type ThesisExplorerActionTypes = SetReferenceThesis | SelectPage

export interface ThesesExplorerActions {
    setReferenceThesis (thesis?: VotedThesis) : SetReferenceThesis
    selectPage (page: number) : SelectPage
}

export interface RelatedTheses {
    unrelatedTheses: ThesesIndex
    supportingTheses: ThesisRelation[]
    supportedTheses: ThesisRelation[]
    contradictingTheses: ThesisRelation[]
}

export interface ThesisExplorerState {
    // "view configuration" properties (eg. fetched from query string, see dev_query_string branch)
    referenceThesis?: VotedThesis
    page: number
}
