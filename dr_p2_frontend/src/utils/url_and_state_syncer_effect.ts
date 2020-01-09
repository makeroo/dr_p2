import { useEffect } from "react"

/*

This hook implements an url - redux state synchronization pattern.

Use case: the url contains an entity id, the redux state contains the entity itself,
fetched by some backend API.

pred predicate checks if url and state are in sync, that is if the redux state contains
the entity referred by the url.

stateSyncer func trigger the action that fetches the entity.

Usually the fetching action triggers redux state updates through the usual states: loading, loaded and so on,
and the component using this hook should handle all of them.

Beware that stateSyncer may be called more than once given the same entity id. Check that fetch API is called only once.
This can be accomplished both in pred and stateSyncer: pred should return true even when redux state is loading if
the loading entity id is the same in the url. stateSyncer should not call fetching API if a request for the same id
is already running.

*/
export default function useUrlAndStateSyncer (pred: () => Boolean, stateSyncer: () => void) {
    useEffect(() => {
        //console.log('useUrlAndStateSyncer: running')

        if (pred()) {
            return
        }

        //console.log('useUrlAndStateSyncer: state not in sync, triggering syncer action')

        stateSyncer()
    }, [pred, stateSyncer])
}
