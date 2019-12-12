import { Discussion, Voting, Thesis, Relation, RelationType } from "../store/discussion/types"

class DiscussionService {
    private fake_ids = 10

    newProblem(question: string): Promise<number> {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(1)
            }, 1000)
        })

    }

    getDiscussion(id: number): Promise<Discussion> {
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
                            content: 'a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a a a s s s a a a a a a a a a a ',
                        },
                    ],
                    relations: []
                }

                resolve(discussion)
            })
        })
    }

    getVoting(id: number): Promise<Voting> {
        return new Promise<Voting>((resolve) => {
            setTimeout(() => {
                const voting : Voting = {
                    theses_votes: [],
                    relations_voltes: []
                }

                resolve(voting)
            }, 1000)
        })
    }

    postThesis(is_solution: boolean, content: string): Promise<Thesis> {
        return new Promise<Thesis>((resolve) => {
            setTimeout(() => {
                const thesis = {
                    id: this.fake_ids++,
                    solution: is_solution,
                    content
                }

                resolve(thesis)
            }, 1000)
        })
    }

    postRelation(thesis1: Thesis, thesis2: Thesis, relationType: RelationType): Promise<Relation> {
        return new Promise<Relation>((resolve) => {
            setTimeout(() => {
                const relation = {
                    id: this.fake_ids++,
                    thesis1: thesis1.id,
                    thesis2: thesis2.id,
                    type: relationType
                }

                resolve(relation)
            }, 1000)
        })
    }
}

export default DiscussionService
