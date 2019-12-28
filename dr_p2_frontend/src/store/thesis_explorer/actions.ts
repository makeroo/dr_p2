import { VotedThesis } from "../discussion/types";
import {
    SET_REFERENCE_THESIS,
    SELECT_PAGE,
    SetReferenceThesis,
    SelectPage
} from "./types";

export function setReferenceThesis (thesis?: VotedThesis) : SetReferenceThesis {
    return {
        type: SET_REFERENCE_THESIS,
        thesis
    }
}

export function selectPage (page: number) : SelectPage {
    return {
        type: SELECT_PAGE,
        page
    }
}
