import createRegistry from './registry'
import { AppActions } from './types'

// inspired by https://itnext.io/make-services-a-natural-prt-of-redux-architecture-8a78b6a4b961
// well almost copied, with a few differences:
// sync reducers conf: no need to inject services into reducers
// typed: typescript instead of plain js

const actionRegistry = createRegistry<AppActions>()

export const registerActions = actionRegistry.register

export default actionRegistry.exposeRegistered()
