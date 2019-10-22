import { Discussion, IndexedDiscussion, RelationType, RelationIndex } from "./types";

function updateIndex (index: RelationIndex, k: number, v:number) {
    var ids = index[k]
    if (ids === undefined) {
        ids = []
        index[k] = ids
    }

    ids.push(v)
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
