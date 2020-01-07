import { ThunkAction } from "redux-thunk"

export const CREATE_PROBLEM = 'CREATE_PROBLEM'
export const CREATING_PROBLEM = 'CREATING_PROBLEM'
export const LOAD_DISCUSSION = 'LOAD_DISCUSSION'
export const LOAD_VOTING = 'LOAD_VOTING'
export const ADD_THESIS = 'ADD_THESIS'
export const ADD_RELATION = 'ADD_RELATION'
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

export interface LoadVotingAction {
    type: typeof LOAD_VOTING
    voting: Voting
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

export interface AddRelationAction {
    type: typeof ADD_RELATION
    relation: Relation
}

export type DiscussionActionTypes = CreateProblemAction | CreatingProblemAction | LoadDiscussionAction | LoadVotingAction | WorkingOnDiscussionAction | DiscussionReadyAction | AddThesisAction | AddRelationAction

export interface DiscussionActions {
    createProblem (id: number, question: string): CreateProblemAction
    creatingProblem(): CreatingProblemAction
    loadDiscussion(discussion: Discussion): LoadDiscussionAction
    loadVoting(voting: Voting): LoadVotingAction
    workingOnDiscussion(): WorkingOnDiscussionAction
    discussionReady(): DiscussionReadyAction
    addThesis(thesis: Thesis): AddThesisAction
    addRelation(relation: Relation): AddRelationAction
    newProblem(question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction>
    getDiscussion(id: number): ThunkAction<Promise<Discussion>, LoadDiscussionAction, Discussion, LoadDiscussionAction>
    getVoting(id: number): ThunkAction<Promise<Voting>, LoadDiscussionAction, Voting, LoadDiscussionAction>
    postThesis(is_solution: boolean, content: string): ThunkAction<Promise<Thesis>, AddThesisAction, Thesis, AddThesisAction>
    postRelation(thesis1: Thesis, thesis2: Thesis, relationType: RelationType): ThunkAction<Promise<Relation>, AddRelationAction, Relation, AddRelationAction>
}

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

export enum Vote {
    Up = 1,
    Seen = 0,
    Down = -1,
}

export interface VoteSummary {
    // voted object
    id: number
    // logged user vote
    vote: Vote | null
    // aggregation
    ups: number,
    downs: number
}

export interface Voting {
    theses_votes: VoteSummary[]
    relations_voltes: VoteSummary[]
}

// TODO: define an incremental model: client has a "view" of the whole discussion

export interface DiscussionState {
    /* if loading is true then either we are loading the whole discussion
     * or we are modifying it
     */
    loading: boolean

    discussion?: Discussion
    voting?: Voting

    indexedDiscussion?: IndexedDiscussion
}

export interface VotedThesis {
    thesis: Thesis
    vote: VoteSummary
}

export interface VotedRelation {
    relation: Relation
    vote: VoteSummary
}

/**
 * Map from thesis id (actually a number) to thesis object.
 */
export interface ThesesIndex {
    [id: string]: VotedThesis
}

/*
 * Map from relation id (actually a number) to voted relation.
 */
interface RelationIndex {
    [id: string]: VotedRelation
}

export class ThesisRelation {
    constructor(public to: VotedThesis, public relation: VotedRelation) {}
}

/**
 * Map from thesis id (actually a number) to list of thesis id (theoretically a set)
 */
export interface ThesesRelationIndex {
    [from: string]: ThesisRelation[]
}

export interface IndexedDiscussion {
    theses: ThesesIndex
    solutions: VotedThesis[]
    relations: RelationIndex

    supports: ThesesRelationIndex
    invertedSupports: ThesesRelationIndex
    contradictions: ThesesRelationIndex

    /**
     * Theses that do not support other theses.
     * These theses are listed in a "special" column.
     */
    unbindedTheses: ThesesIndex
}
