import { VotedThesis } from "../discussion/types";
import { SET_REFERENCE_THESIS } from "./types";

export function setReferenceThesis (thesis: VotedThesis) {
    return {
        type: SET_REFERENCE_THESIS,
        thesis
    }
}
