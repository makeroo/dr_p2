import { VotedThesis, IndexedDiscussion } from "../discussion/types";
import { RelatedTheses } from "./types";


export function relatedTheses(thesis:VotedThesis | undefined, indexedDiscussion: IndexedDiscussion | undefined): RelatedTheses {
    if (thesis === undefined || indexedDiscussion === undefined) {
        return {
            unrelatedTheses: {},
            supportedTheses: [],
            supportingTheses: [],
            contradictingTheses: []
        }
    }

    const thesisId = thesis.thesis.id
    const allTheses = {...indexedDiscussion.theses}

    const related = {
        unrelatedTheses: allTheses,
        supportedTheses: indexedDiscussion.supports[thesisId],
        supportingTheses: indexedDiscussion.invertedSupports[thesisId],
        contradictingTheses: indexedDiscussion.contradictions[thesisId]
    }

    for (let t of related.supportedTheses) {
        delete allTheses[t.to.thesis.id]
    }

    for (let t of related.supportingTheses) {
        delete allTheses[t.to.thesis.id]
    }

    for (let t of related.contradictingTheses) {
        delete allTheses[t.to.thesis.id]
    }

    return related
}
