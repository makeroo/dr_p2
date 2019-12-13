function createRegistry<T>() {
    // warning: this is valid as long as registered object is used only
    // after being configured via register() method
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
