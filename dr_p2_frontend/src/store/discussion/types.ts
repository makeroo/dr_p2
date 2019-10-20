export const CREATE_PROBLEM = 'CREATE_PROBLEM'
export const CREATING_PROBLEM = 'CREATING_PROBLEM'
export const LOAD_DISCUSSION = 'LOAD_DISCUSSION'
export const ADD_THESIS = 'ADD_THESIS'
export const WORKING_ON_DISCUSSION = 'WORKING_ON_DISCUSSION'
export const DISCUSSION_READY = 'DISCUSSION_READY'

export interface CreateProblemAction {
    type: typeof CREATE_PROBLEM
    id: number
    question: string
}

export interface CreatingProblemAction {
    type: typeof CREATING_PROBLEM
}

export interface LoadDiscussionAction {
    type: typeof LOAD_DISCUSSION
    discussion: Discussion
}

export interface WorkingOnDiscussionAction {
    type: typeof WORKING_ON_DISCUSSION
}

export interface DiscussionReadyAction {
    type: typeof DISCUSSION_READY
}

export interface AddThesisAction {
    type: typeof ADD_THESIS
    thesis: Thesis
}

export type DiscussionActionTypes = CreateProblemAction | CreatingProblemAction | LoadDiscussionAction | WorkingOnDiscussionAction | DiscussionReadyAction | AddThesisAction

export interface Thesis {
    id: number
    content: string
    solution: boolean
}

export enum RelationType {
    support,
    contradiction,
}

export interface Relation {
    id: number
    type: RelationType
    thesis1: number
    thesis2: number
}

export interface Discussion {
    id: number
    question: string
    theses: Thesis[]
    relations: Relation[]
}

// TODO: define an incremental model: client has a "view" of the whole discussion
export interface DiscussionState {
    /* if discussion is undefined and loading is true then
     * we're loading the whole discussion (or a view of it)
     * otherwise we're working / modifying it
     */
    loading: boolean

    discussion?: Discussion
    indexedDiscussion?: IndexedDiscussion
}

interface ThesesIndex {
    [id: string]: Thesis
}

export interface RelationIndex {
    [from: string]: number[]
}

export interface IndexedDiscussion {
    theses: ThesesIndex
    solutions: Thesis[]

    supports: RelationIndex
    invertedSupports: RelationIndex
    contradictions: RelationIndex
}
