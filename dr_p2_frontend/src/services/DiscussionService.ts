import { Discussion, Voting, Thesis, Relation, RelationType } from "../store/discussion/types"
import { singleRequest1 } from "../utils/single_request"

class DiscussionService {
    private fake_ids = 10

    newProblem = singleRequest1((question: string): Promise<number> => {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        })

    })

    getDiscussion = singleRequest1((id: number): Promise<Discussion> => {
        return new Promise<Discussion>((resolve) => {
            setTimeout(() => {
                const discussion = {
                    id: id,
                    question: 'ci stiamo dentro?',
                    theses: [
                        {
                            id: 1001,
                            solution: true,
                            content: 's1',
                        },
                        {
                            id: 1002,
                            solution: true,
                            content: 's2',
                        },
                        {
                            id: 1003,
                            solution: true,
                            content: 's3',
                        },
                        {
                            id: 1004,
                            solution: true,
                            content: 's4',
                        },
                        {
                            id: 1005,
                            solution: true,
                            content: 's5',
                        },
                        {
                            id: 1006,
                            solution: true,
                            content: 's6',
                        },
                        {
                            id: 1007,
                            solution: false,
                            content: 't7 a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a ',
                        },
                        {
                            id: 1008,
                            solution: false,
                            content: 't8',
                        },
                        {
                            id: 1009,
                            solution: false,
                            content: 't9',
                        },
                        {
                            id: 1010,
                            solution: false,
                            content: 't10',
                        },
                        {
                            id: 1011,
                            solution: false,
                            content: 't11',
                        },
                        {
                            id: 1012,
                            solution: false,
                            content: 't12',
                        },
                    ],
                    relations: [
                        {
                            id: 2000,
                            type: 0,
                            thesis1: 1008,
                            thesis2: 1001
                        },
                        {
                            id: 2001,
                            type: 0,
                            thesis1: 1009,
                            thesis2: 1002
                        },
                        {
                            id: 2002,
                            type: 0,
                            thesis1: 1010,
                            thesis2: 1003
                        },
                        {
                            id: 2003,
                            type: 0,
                            thesis1: 1011,
                            thesis2: 1008
                        },
                        {
                            id: 2003,
                            type: 1,
                            thesis1: 1012,
                            thesis2: 1008
                        },
                    ]
                }

                resolve(discussion)
            })
        })
    })

    getVoting = singleRequest1((id: number): Promise<Voting> => {
        return new Promise<Voting>((resolve) => {
            setTimeout(() => {
                const voting : Voting = {
                    theses_votes: [],
                    relations_voltes: []
                }

                resolve(voting)
            }, 1000)
        })
    })

    postThesis (is_solution: boolean, content: string): Promise<Thesis> {
        const thesis = {
            id: this.fake_ids++,
            solution: is_solution,
            content
        }

        return this._postThesis(thesis)
    }

    private _postThesis = singleRequest1((thesis: Thesis): Promise<Thesis> => {
        return new Promise<Thesis>((resolve) => {
            setTimeout(() => {

                resolve(thesis)
            }, 1000)
        })
    })

    postRelation(thesis1: Thesis, thesis2: Thesis, relationType: RelationType): Promise<Relation> {
        const relation = {
            id: this.fake_ids++,
            thesis1: thesis1.id,
            thesis2: thesis2.id,
            type: relationType
        }

        return this._postRelation(relation)
    }

    private _postRelation = singleRequest1((relation: Relation): Promise<Relation> => {
        return new Promise<Relation>((resolve) => {
            setTimeout(() => {

                resolve(relation)
            }, 1000)
        })
    })
}

export default DiscussionService
