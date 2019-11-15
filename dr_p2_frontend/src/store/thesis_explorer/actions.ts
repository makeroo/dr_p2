import { Thesis } from "../discussion/types";
import { SET_REFERENCE_THESIS } from "./types";

export function setReferenceThesis (thesis: Thesis) {
    return {
        type: SET_REFERENCE_THESIS,
        thesis
    }
}
