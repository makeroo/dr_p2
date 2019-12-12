import React from 'react'
import { ComponentType, useEffect } from 'react'
import { Route, RouteProps } from "react-router-dom"
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../store/index'

import WelcomePage from './WelcomePage'
import Loading from './Loading'
import actions from '../context'
import { QueryState } from '../store/auth/types'

// this is what PrivateRoute fc receives
type PrivateRouteProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

// these are any properties declared in jsx nodes
interface PrivateRouteTagProps extends RouteProps {
    component: ComponentType<any> // FIXME: I still don't understand why this definition doesn't work <RouteComponentProps | {}>
}

// this is where I build PR props from both state and jsx
const mapStateToProps = (state: AppState, props: PrivateRouteTagProps) => ({
    auth: state.auth,
    ...props
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getSessionUser: async () => {
        dispatch(actions.auth.getSessionUser())
    }
})

const PrivateRoute : React.FC<PrivateRouteProps> = (props) => {
    const { auth, getSessionUser, component, ...rest } = props;

    useEffect(() => {
        //console.log('querying session user')

        // note: getSessionUser gets called once per PrivateRoute instance
        // I could move this block where Router is configured, that is in App component,
        // but I prefer here because App would get cluttered
        getSessionUser()
    }, [getSessionUser]) // note: getSessionUser is a closure so it is a new object everytime I'm invoked
                         // same as passing no array at all

    const InnerComponent = component

    return <Route {...rest} render={(props) => {
        if (auth.state === QueryState.checkingSession) {
            return <Loading/>
        }

        if (auth.loggedIn) {
            return <InnerComponent {...props}/>
        }

        return <WelcomePage/>
    }}/>
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
