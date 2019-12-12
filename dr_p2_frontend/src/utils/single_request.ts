export function singleRequest<T>(f:() => Promise<T>): () => Promise<T> {
    var p : Promise<T> | null = null

    return () => {
        if (p !== null) {
            return p;
        }

        p = f().then((a: T) => {
            p = null;

            return a
        })

        return p
    }
}

export function singleRequest1<A, T>(f:(a: A) => Promise<T>): (a: A) => Promise<T> {

    var promiseIndex = new Map<A, Promise<T>>()

    return (a: A) => {
        var p = promiseIndex.get(a)

        if (p !== undefined) {
            return p;
        }

        p = f(a).then((r: T) => {
            promiseIndex.delete(a)

            return r
        })

        promiseIndex.set(a, p)

        return p
    }
}
