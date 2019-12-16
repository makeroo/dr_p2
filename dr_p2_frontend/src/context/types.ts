import { AuthActions } from "../store/auth/types";
import { DiscussionActions } from "../store/discussion/types";
import { DiscussionExplorerActions } from "../store/discussion_explorer/types";

export interface AppActions {
    auth: AuthActions,
    discussion: DiscussionActions,
    discussion_explorer: DiscussionExplorerActions,
}
