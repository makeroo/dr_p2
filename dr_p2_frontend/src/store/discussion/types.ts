export const CREATE_PROBLEM = 'CREATE_PROBLEM'
export const CREATING_PROBLEM = 'CREATING_PROBLEM'
export const LOAD_DISCUSSION = 'LOAD_DISCUSSION'

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

export type DiscussionActionTypes = CreateProblemAction | CreatingProblemAction | LoadDiscussionAction

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
    loading: boolean

    discussion?: Discussion
}
