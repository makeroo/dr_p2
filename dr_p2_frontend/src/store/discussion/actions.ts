import {
    Discussion, Thesis, Relation, Voting, VotedThesis,
    CreateProblemAction, CREATE_PROBLEM,
    CreatingProblemAction, CREATING_PROBLEM,
    LoadDiscussionAction, LOAD_DISCUSSION,
    AddThesisAction, ADD_THESIS,
    WorkingOnDiscussionAction, WORKING_ON_DISCUSSION,
    DiscussionReadyAction, DISCUSSION_READY,
    AddRelationAction, ADD_RELATION,
    AddVoteAction, ADD_VOTE,
} from './types'

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

export function loadDiscussion(discussion: Discussion, voting: Voting): LoadDiscussionAction {
    return {
        type: LOAD_DISCUSSION,
        discussion,
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

export function addVote(votedThesis: VotedThesis): AddVoteAction {
    return {
        type: ADD_VOTE,
        votedThesis
    }
}
