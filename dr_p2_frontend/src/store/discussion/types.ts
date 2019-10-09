export const CREATE_PROBLEM = 'CREATE_PROBLEM'

export interface CreateProblemAction {
    type: typeof CREATE_PROBLEM
    id: number
    question: string
}

export type DiscussionActionTypes = CreateProblemAction

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

// TODO: define an incremental model: client has a "view" of the whole discussion
export interface DiscussionState {
    id: number
    question: string
    theses: Thesis[]
    relations: Relation[]
}
