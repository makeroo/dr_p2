import { NextSolutionPageAction, PrevSolutionPageAction, NEXT_SOLUTION_PAGE, PREV_SOLUTION_PAGE } from "./types";

export function nextSolutionPage () : NextSolutionPageAction {
    return {
        type: NEXT_SOLUTION_PAGE
    }
}

export function prevSolutionPage () : PrevSolutionPageAction {
    return {
        type: PREV_SOLUTION_PAGE
    }
}
