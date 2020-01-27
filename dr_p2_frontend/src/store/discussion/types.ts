import { ThunkAction } from "redux-thunk"

export const CREATE_PROBLEM = 'CREATE_PROBLEM'
export const CREATING_PROBLEM = 'CREATING_PROBLEM'
export const LOAD_DISCUSSION = 'LOAD_DISCUSSION'
export const ADD_THESIS = 'ADD_THESIS'
export const ADD_RELATION = 'ADD_RELATION'
export const ADD_VOTE = 'ADD_VOTE'
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

export interface AddVoteAction {
    type: typeof ADD_VOTE
    votedThesis: VotedThesis
}

export type DiscussionActionTypes = CreateProblemAction | CreatingProblemAction | LoadDiscussionAction | WorkingOnDiscussionAction | DiscussionReadyAction | AddThesisAction | AddRelationAction | AddVoteAction

export interface DiscussionActions {
    createProblem (id: number, question: string): CreateProblemAction
    creatingProblem(): CreatingProblemAction
    loadDiscussion(discussion: Discussion, voting: Voting): LoadDiscussionAction
    workingOnDiscussion(): WorkingOnDiscussionAction
    discussionReady(): DiscussionReadyAction
    addThesis(thesis: Thesis): AddThesisAction
    addRelation(relation: Relation): AddRelationAction
    addVote(votedThesis: VotedThesis): AddVoteAction
    newProblem(question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction>
    getDiscussion(id: number): ThunkAction<Promise<Discussion>, LoadDiscussionAction, Discussion, LoadDiscussionAction>
    postThesis(is_solution: boolean, content: string): ThunkAction<Promise<Thesis>, AddThesisAction, Thesis, AddThesisAction>
    postRelation(thesis1: Thesis, thesis2: Thesis, relationType: RelationType): ThunkAction<Promise<Relation>, AddRelationAction, Relation, AddRelationAction>
    postVote(votedThesis: VotedThesis, vote: Vote): ThunkAction<Promise<VotedThesis>, AddVoteAction, VotedThesis, AddVoteAction>
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
    // aggregation (including logged user vote)
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

    id?: number // loaded discussion id
    question?: string // loaded discussion question

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
