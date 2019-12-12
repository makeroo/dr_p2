import { AuthActions } from "../store/auth/types";
import { DiscussionActions } from "../store/discussion/types";

export interface AppActions {
    auth: AuthActions,
    discussion: DiscussionActions
}
