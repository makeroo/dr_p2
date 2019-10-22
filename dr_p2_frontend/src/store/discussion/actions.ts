import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'

import {
    Discussion, Thesis,
    CreateProblemAction, CREATE_PROBLEM,
    CreatingProblemAction, CREATING_PROBLEM,
    LoadDiscussionAction, LOAD_DISCUSSION,
    AddThesisAction, ADD_THESIS,
    WorkingOnDiscussionAction, WORKING_ON_DISCUSSION, DiscussionReadyAction, DISCUSSION_READY,
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

export function loadDiscussion(discussion: Discussion): LoadDiscussionAction {
    return {
        type: LOAD_DISCUSSION,
        discussion
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

export const newProblem = (question: string): ThunkAction<Promise<number>, CreateProblemAction, number, CreateProblemAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<number> => {
        dispatch(creatingProblem())

        return new Promise<number>((resolve) => {
            setTimeout(() => {
                const action = createProblem(1, question)

                dispatch(action)

                resolve(action.id)
            }, 1000)
        })
    }
}

export const getDiscussion = (id: number): ThunkAction<Promise<Discussion>, LoadDiscussionAction, Discussion, LoadDiscussionAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Discussion> => {
        dispatch(creatingProblem())
 
        return new Promise<Discussion>((resolve) => {
            setTimeout(() => {
                const discussion = {
                    id: id,
                    question: 'ci stiamo dentro?',
                    theses: [
                        {
                            id: 1001,
                            solution: true,
                            content: '1',
                        },
                        {
                            id: 1002,
                            solution: true,
                            content: '2',
                        },
                        {
                            id: 1003,
                            solution: true,
                            content: '3',
                        },
                        {
                            id: 1004,
                            solution: true,
                            content: '4',
                        },
                        {
                            id: 1005,
                            solution: true,
                            content: '5',
                        },
                        {
                            id: 1006,
                            solution: true,
                            content: '6',
                        },
                        {
                            id: 1007,
                            solution: false,
                            content: '7',
                        },
                    ],
                    relations: []
                }

                dispatch(loadDiscussion(discussion))

                resolve(discussion)
            }, 1000)
        })
    }
}

let fake_thesis_ids = 10
export const postThesis = (is_solution: boolean, content: string): ThunkAction<Promise<Thesis>, AddThesisAction, Thesis, AddThesisAction> => {
    return async (dispatch: ThunkDispatch<any, any, AnyAction>): Promise<Thesis> => {
        dispatch(workingOnDiscussion())

        return new Promise<Thesis>((resolve) => {
            setTimeout(() => {
                const thesis = {
                    id: fake_thesis_ids++,
                    solution: is_solution,
                    content
                }

                dispatch(addThesis(thesis))

                dispatch(discussionReady())

                resolve(thesis)
            }, 1000)
        })
    }
}
