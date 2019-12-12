import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import {
    Discussion, Thesis, RelationType, Relation, Voting,    
    CreateProblemAction, CREATE_PROBLEM,
    CreatingProblemAction, CREATING_PROBLEM,
    LoadDiscussionAction, LOAD_DISCUSSION,
    AddThesisAction, ADD_THESIS,
    WorkingOnDiscussionAction, WORKING_ON_DISCUSSION,
    DiscussionReadyAction, DISCUSSION_READY,
    AddRelationAction, ADD_RELATION,
    LoadVotingAction, LOAD_VOTING,
} from './types'
import DiscussionService from '../../services/DiscussionService'

export function createProblem(id: number, question: string): CreateProblemAction {
    return {
        type: CREATE_PROBLEM,
        id,
        question
    }
}

export function creatingProblem(): CreatingProblemAction {
    return {
        type: CREATING_PROBLEM
    }
}

export function loadDiscussion(discussion: Discussion): LoadDiscussionAction {
    return {
        type: LOAD_DISCUSSION,
        discussion
    }
}

export function loadVoting(voting: Voting): LoadVotingAction {
    return {
        type: LOAD_VOTING,
        voting
    }
}

export function workingOnDiscussion(): WorkingOnDiscussionAction {
    return {
        type: WORKING_ON_DISCUSSION
    }
}

export function discussionReady(): DiscussionReadyAction {
    return {
        type: DISCUSSION_READY
    }
}

export function addThesis(thesis: Thesis): AddThesisAction {
    return {
        type: ADD_THESIS,
        thesis
    }
}

export function addRelation(relation: Relation): AddRelationAction {
    return {
        type: ADD_RELATION,
        relation
    }
}

export const newProblem = (discussionService: DiscussionService) => (question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<number> => {
        dispatch(creatingProblem())

        return discussionService.newProblem(question).then((problemId) => {
            const action = createProblem(problemId, question)

            dispatch(action)

            return problemId
        })
    }
}

export const getDiscussion = (discussionService: DiscussionService) => (id: number): ThunkAction<Promise<Discussion>, LoadDiscussionAction, Discussion, LoadDiscussionAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Discussion> => {
        dispatch(creatingProblem())

        return Promise.all([
            discussionService.getDiscussion(id),
            discussionService.getVoting(id)
        ]).then(([discussion, voting]) => {
            dispatch(loadDiscussion(discussion))
            dispatch(loadVoting(voting))

            return discussion
        })
    }
}

export const getVoting = (discussionService: DiscussionService) => (id: number): ThunkAction<Promise<Voting>, LoadDiscussionAction, Voting, LoadDiscussionAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Voting> => {
        dispatch(workingOnDiscussion())
 
        return discussionService.getVoting(id).then((voting) => {
            dispatch(loadVoting(voting))

            return voting
        })
    }
}

export const postThesis = (discussionService: DiscussionService) => (is_solution: boolean, content: string): ThunkAction<Promise<Thesis>, AddThesisAction, Thesis, AddThesisAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Thesis> => {
        dispatch(workingOnDiscussion())

        return discussionService.postThesis(is_solution, content).then((thesis) => {

            dispatch(addThesis(thesis))

            dispatch(discussionReady())

            return thesis
        })
    }
}

export const postRelation = (discussionService: DiscussionService) => (thesis1: Thesis, thesis2: Thesis, relationType: RelationType): ThunkAction<Promise<Relation>, AddRelationAction, Relation, AddRelationAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Relation> => {
        dispatch(workingOnDiscussion())

        return discussionService.postRelation(thesis1, thesis2, relationType).then((relation) => {

            dispatch(addRelation(relation))

            dispatch(discussionReady())

            return relation
        })
    }
}
