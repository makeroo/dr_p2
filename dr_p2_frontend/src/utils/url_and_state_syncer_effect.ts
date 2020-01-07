import { useEffect } from "react"

export default function useUrlAndStateSyncer (pred: () => Boolean, stateSyncer: () => void) {
    useEffect(() => {
        //console.log('SOLU 2 check')

        if (pred()) {
            return
        }

        //console.log('SOLU 3 fetch')

        stateSyncer()
    }, [pred, stateSyncer])
}
