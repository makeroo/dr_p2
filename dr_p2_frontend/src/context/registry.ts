function createRegistry<T>() {
    var registered : T = {} as T

    return {
        exposeRegistered: () => {
            return registered
        },

        register: (actions: T) => {
            Object.assign(registered, actions)
        }
    }
}
  
export default createRegistry
