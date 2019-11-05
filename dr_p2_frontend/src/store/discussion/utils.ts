import { Discussion, IndexedDiscussion, RelationType, RelationIndex, Relation } from "./types";

function updateIndex (index: RelationIndex, k: number, v:number) {
    var ids = index[k]
    if (ids === undefined) {
        ids = []
        index[k] = ids
    }

    ids.push(v)
}

export function addRelation (indexedDiscussion: IndexedDiscussion, relation: Relation) : [IndexedDiscussion, boolean] {
    switch (relation.type) {
    case RelationType.support:
        let supported = indexedDiscussion.supports[relation.thesis1]

        if (supported && supported.indexOf(relation.thesis2) !== -1) {
            return [indexedDiscussion, false]
        }

        let supports = {...indexedDiscussion.supports}
        let invertedSupports = {...indexedDiscussion.invertedSupports}

        if (supported) {
            supported = [...supported]
        } else {
            supported = []
            supports[relation.thesis1] = supported
        }

        let inv = invertedSupports[relation.thesis2]

        if (inv) {
            inv = [...inv]
        } else {
            inv = []
            invertedSupports[relation.thesis2] = inv
        }

        supported.push(relation.thesis2)
        inv.push(relation.thesis1)

        return [{
            ...indexedDiscussion,
            supports,
            invertedSupports
        }, true]

    case RelationType.contradiction:
        let contradicted = indexedDiscussion.contradictions[relation.thesis1]

        if (contradicted && contradicted.indexOf(relation.thesis2) !== -1) {
            return [indexedDiscussion, false]
        }

        let contradictions = {...indexedDiscussion.contradictions}

        if (contradicted) {
            contradicted = [...contradicted]
        } else {
            contradicted = []
            contradictions[relation.thesis1] = contradicted
        }

        contradicted.push(relation.thesis2)

        contradicted = contradictions[relation.thesis2]

        if (contradicted) {
            contradicted = [...contradicted]
        } else {
            contradicted = []
            contradictions[relation.thesis2] = contradicted
        }

        contradicted.push(relation.thesis1)

        return [{
            ...indexedDiscussion,
            contradictions
        }, true]
    }
}

export function indexDiscussion (discussion: Discussion): IndexedDiscussion {
    var r : IndexedDiscussion = {
        theses: {},
        solutions: [],
        supports: {},
        invertedSupports: {},
        contradictions: {},
        unbindedTheses: {}
    }

    for (let thesis of discussion.theses) {
        r.theses[thesis.id] = thesis

        if (thesis.solution) {
            r.solutions.push(thesis)
        } else {
            r.unbindedTheses[thesis.id] = thesis
        }
    }

    for (let relation of discussion.relations) {
        let relIndex : RelationIndex, invIndex;

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

        updateIndex(relIndex, relation.thesis1, relation.thesis2)

        updateIndex(invIndex, relation.thesis2, relation.thesis1)
    }

    return r
}
