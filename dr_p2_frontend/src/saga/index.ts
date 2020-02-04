import { AppServices } from "../services";

import { SagaMiddleware, Saga } from 'redux-saga'
import { select, take, apply, put, all, Effect } from 'redux-saga/effects'
import { QueryState } from "../store/auth/types";
import { pendingRequest, declareName, notLoggedIn } from "../store/auth/actions";
import { Thesis, RelationType, VotedThesis, Vote, Discussion, Voting, Relation } from "../store/discussion/types";
import { creatingProblem, createProblem, loadDiscussion, workingOnDiscussion, addThesis, discussionReady, addRelation, addVote } from "../store/discussion/actions"
import { History } from 'history'

const SAGA_ACTION_LOGIN = 'SAGA_ACTION_LOGIN'
const SAGA_ACTION_FETCH_SESSION_USER = 'SAGA_ACTION_FETCH_SESSION_USER'
const SAGA_ACTION_POST_THESIS = 'SAGA_ACTION_POST_THESIS'
const SAGA_ACTION_POST_RELATION = 'SAGA_ACTION_POST_RELATION'
const SAGA_ACTION_POST_VOTE = 'SAGA_ACTION_POST_VOTE'
const SAGA_ACTION_FETCH_DISCUSSION = 'SAGA_ACTION_FETCH_DISCUSSION'
const SAGA_ACTION_NEW_PROBLEM = 'SAGA_ACTION_NEW_PROBLEM'


export function login(username: string) {
    return {
        type: SAGA_ACTION_LOGIN,
        payload: username
    }
}

export function fetchSessionUser() {
    return {
        type: SAGA_ACTION_FETCH_SESSION_USER
    }
}

export function postThesis(is_solution: boolean, content: string) {
    return {
        type: SAGA_ACTION_POST_THESIS,
        payload: {
            is_solution,
            content
        }
    }
}

export function postRelation(thesis1: Thesis, thesis2: Thesis, type: RelationType) {
    return {
        type: SAGA_ACTION_POST_RELATION,
        payload: {
            thesis1,
            thesis2,
            type
        }
    }
}

export function postVote(votedThesis: VotedThesis, vote: Vote) {
    return {
        type: SAGA_ACTION_POST_VOTE,
        payload: {
            votedThesis,
            vote
        }
    }
}

export function fetchDiscussion(id: number) {
    return {
        type: SAGA_ACTION_FETCH_DISCUSSION,
        payload: id
    }
}

export function newProblem(question: string, history: History) {
    return {
        type: SAGA_ACTION_NEW_PROBLEM,
        payload: {
            question,
            history
        }
    }
}

function saga(services: AppServices): Saga {
    const { authenticationService, discussionService } = services

    return function*() {
        while (true) {
            let actionu = yield take('*')
            const action = actionu as unknown as Effect
            const state = yield select()

            console.log(action, state)

            if (action.type === SAGA_ACTION_LOGIN) {
                const login = action.payload

                yield put(pendingRequest(QueryState.signingIn))

                try {
                    yield apply(authenticationService, authenticationService.login, [login])

                    yield put(declareName(login))
                } catch (error) {
                    console.error('login failed', error)
                    // TODO
                }

            } else if (action.type === SAGA_ACTION_FETCH_SESSION_USER) {
                // no payload

                yield put (pendingRequest(QueryState.checkingSession))

                try {
                    const username = yield apply(authenticationService, authenticationService.getSessionUser, [])

                    yield put(declareName(username as unknown as string))
                } catch (error) {
                    console.log('not logged in:', error)

                    yield put(notLoggedIn())
                }

            } else if (action.type === SAGA_ACTION_NEW_PROBLEM) {
                const { question, history } = action.payload as {
                    question: string
                    history: History
                }

                yield put(creatingProblem())

                try {
                    const pid = yield apply(discussionService, discussionService.newProblem, [question])

                    yield put(createProblem(pid as unknown as number, question))

                    history.push(`/problem/${pid}`)
                } catch (error) {
                    console.error('problem creation failed', error)

                    // TODO: yield effect
                }

            } else if (action.type === SAGA_ACTION_POST_THESIS) {
                yield put(workingOnDiscussion())

                try {
                    const { is_solution, content } = action.payload as {
                        is_solution: boolean
                        content: string
                    }

                    const thesis = yield apply(discussionService, discussionService.postThesis, [is_solution, content])

                    yield put(addThesis(thesis as unknown as Thesis))
                    yield put(discussionReady())
                } catch (error) {
                    console.error('thesis creation failed', error)

                    // TODO: yield effect
                }

            } else if (action.type === SAGA_ACTION_POST_RELATION) {
                yield put(workingOnDiscussion())

                try {
                    const { thesis1, thesis2, type } = action.payload as {
                        thesis1: Thesis,
                        thesis2: Thesis,
                        type: RelationType
                    }

                    const relation = yield apply(discussionService, discussionService.postRelation, [thesis1, thesis2, type])

                    yield put(addRelation(relation as unknown as Relation))
                    yield put(discussionReady())
                } catch (error) {
                    console.error('relation creation failed', error)

                    // TODO: yield effect
                }

            } else if (action.type === SAGA_ACTION_POST_VOTE) {
                yield put(workingOnDiscussion())

                try {
                    const { votedThesis, vote } = action.payload as {
                        votedThesis: VotedThesis
                        vote: Vote
                    }

                    const newThesis = yield apply(discussionService, discussionService.postVote, [votedThesis, vote])

                    yield put(addVote(newThesis as unknown as VotedThesis))
                    yield put(discussionReady())
                } catch (error) {
                    console.error('vote failed', error)

                    // TODO: yield effect
                }

            } else if (action.type === SAGA_ACTION_FETCH_DISCUSSION) {
                const pid = action.payload as number

                yield put(creatingProblem())

                try {
                    const result = yield all([
                        apply(discussionService, discussionService.getDiscussion, [pid]),
                        apply(discussionService, discussionService.getVoting, [pid])
                    ])

                    const [discussion, voting] = result as unknown as [Discussion, Voting]

                    yield put(loadDiscussion(discussion, voting))
                } catch (error) {
                    console.error('problem fetch failed', error)

                    // TODO: yield effect
                }
            }
        }
    } as Saga
}

export function configureSaga (mw: SagaMiddleware, services: AppServices) {

    mw.run(saga(services))
}
