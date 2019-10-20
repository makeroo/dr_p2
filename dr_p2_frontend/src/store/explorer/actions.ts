import { SolutionsSelectPageAction, SolutionsAddDialogAction, SOLUTIONS_SELECT_PAGE, SOLUTIONS_ADD_DIALOG } from "./types";

export function solutionsSelectPage (page: number) : SolutionsSelectPageAction {
    return {
        type: SOLUTIONS_SELECT_PAGE,
        page
    }
}

export function addDialog (open: boolean) : SolutionsAddDialogAction {
    return {
        type: SOLUTIONS_ADD_DIALOG,
        open
    }
}
