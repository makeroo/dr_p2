import { Discussion, IndexedDiscussion, RelationType, Relation, Voting, VoteSummary, VotedThesis, VotedRelation, ThesesRelationIndex, ThesisRelation, Vote } from "./types";

export function newVoteSummary (id: number) : VoteSummary {
    return {
        id,
        vote: null,
        ups: 0,
        downs: 0
    }
}

function updateIndex (index: ThesesRelationIndex, from: number, to: VotedThesis, relation:VotedRelation) {
    var destinations = index[from]

    if (destinations === undefined) {
        destinations = []
        index[from] = destinations
    }

    destinations.push({
        to,
        relation
    })
}

export function findThesis (id: number, vvrr : ThesisRelation[]) : boolean {
    for (let x in vvrr) {
        if (vvrr[x].to.thesis.id === id) {
            return true
        }
    }

    return false
}

export function addRelation (indexedDiscussion: IndexedDiscussion, relation: Relation) : [IndexedDiscussion, boolean] {
    if (indexedDiscussion.relations[relation.id]) {
        return [indexedDiscussion, false]
    }

    const voted_thesis1 = indexedDiscussion.theses[relation.thesis1]

    if (!voted_thesis1) {
        console.error('unknown thesis1 in', relation)
        return [indexedDiscussion, false]
    }

    const voted_thesis2 = indexedDiscussion.theses[relation.thesis2]

    if (!voted_thesis2) {
        console.error('unknown thesis2 in', relation)
        return [indexedDiscussion, false]
    }

    const voted_relation : VotedRelation = {
        relation,
        vote: newVoteSummary(relation.id)
    }

    let relations = {...indexedDiscussion.relations}

    relations[relation.id] = voted_relation

    switch (relation.type) {
    case RelationType.support:
        let supported = indexedDiscussion.supports[relation.thesis1]

/* it should NOT happen
        if (supported && findThesis(relation.thesis2, supported)) {
            // FIXME: indexedDiscussion has changed
            return [indexedDiscussion, false]
        }
*/
        let supports = {...indexedDiscussion.supports}
        let invertedSupports = {...indexedDiscussion.invertedSupports}

        if (supported) {
            supported = [...supported]
        } else {
            supported = []
        }
        supports[relation.thesis1] = supported

        let inv = invertedSupports[relation.thesis2]

        if (inv) {
            inv = [...inv]
        } else {
            inv = []
        }
        invertedSupports[relation.thesis2] = inv

        supported.push({
            to: voted_thesis2,
            relation: voted_relation
        })
        inv.push({
            to: voted_thesis1,
            relation: voted_relation
        })

        let unbindedTheses = indexedDiscussion.unbindedTheses
        if (relation.thesis1 in unbindedTheses) {
            unbindedTheses = {...unbindedTheses}

            delete unbindedTheses[relation.thesis1]
        }

        return [{
            ...indexedDiscussion,
            relations,
            supports,
            invertedSupports,
            unbindedTheses
        }, true]

    case RelationType.contradiction:
        let contradicted = indexedDiscussion.contradictions[relation.thesis1]

/* this SHOULD not happen

        if (contradicted && findThesis(relation.thesis2, contradicted)) {
            return [indexedDiscussion, false]
        }
*/
        let contradictions = {...indexedDiscussion.contradictions}

        if (contradicted) {
            contradicted = [...contradicted]
        } else {
            contradicted = []
        }
        contradictions[relation.thesis1] = contradicted

        contradicted.push({
            to: voted_thesis2,
            relation: voted_relation
        })

        contradicted = contradictions[relation.thesis2]

        if (contradicted) {
            contradicted = [...contradicted]
        } else {
            contradicted = []
        }
        contradictions[relation.thesis2] = contradicted

        contradicted.push({
            to: voted_thesis1,
            relation: voted_relation
        })

        return [{
            ...indexedDiscussion,
            relations,
            contradictions
        }, true]
    }
}

export function indexDiscussion (discussion: Discussion, voting: Voting | null): IndexedDiscussion {
    var r : IndexedDiscussion = {
        theses: {},
        relations: {},
        solutions: [],
        supports: {},
        invertedSupports: {},
        contradictions: {},
        unbindedTheses: {}
    }

    for (let thesis of discussion.theses) {
        let vt : VotedThesis = {
            thesis,
            vote: newVoteSummary(thesis.id)
        }

        r.theses[thesis.id] = vt

        if (thesis.solution) {
            r.solutions.push(vt)
        } else {
            r.unbindedTheses[thesis.id] = vt
        }
    }

    for (let relation of discussion.relations) {
        const vt1 = r.theses[relation.thesis1]

        if (vt1 === undefined) {
            console.error('unknown thesis1 in', relation)
            continue
        }

        const vt2 = r.theses[relation.thesis2]

        if (vt2 === undefined) {
            console.error('unknown thesis2 in', relation)
            continue
        }

        let vr : VotedRelation = {
            relation,
            vote: newVoteSummary(relation.id)
        }

        r.relations[relation.id] = vr

        let relIndex : ThesesRelationIndex, invIndex;

        switch (relation.type) {
            case RelationType.support:
                relIndex = r.supports
                invIndex = r.invertedSupports

                delete r.unbindedTheses[relation.thesis1]
                break

            case RelationType.contradiction:
                relIndex = r.contradictions
                invIndex = r.contradictions
                break

            default:
                continue
        }

        updateIndex(relIndex, relation.thesis1, vt2, vr)

        updateIndex(invIndex, relation.thesis2, vt1, vr)
    }

    return r
}

export function summaryChangingVote(summary: VoteSummary, vote: Vote) {
    if (summary.vote === vote) {
        return summary
    }

    const old = summary.vote

    /*   -1   0  +1  old
    -1    -  -1   0
    0    +1   -  -1
    +1   +2  +1   -
    new
    cell = new - old
    -1: downs++
     0: downs++ ups--
    +1: downs--
    -1: ups--
    +2: ups++ downs--
    +1: ups++
    */

    return {
        ...summary,
        vote,
        ups: summary.ups + (vote === Vote.Up ? 1 : 0) - (old === Vote.Up ? 1 : 0),
        downs: summary.downs + (vote === Vote.Down ? 1 : 0) - (old === Vote.Down ? 1 : 0),
    }
}
