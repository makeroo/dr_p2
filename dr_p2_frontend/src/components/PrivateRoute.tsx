import React from 'react'
import { ComponentType, useEffect } from 'react'
import { Route, RouteProps } from "react-router-dom"
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../store/index'

import WelcomePage from './WelcomePage'
import Loading from './Loading'
import { getSessionUser } from '../store/auth/actions'
import { QueryState, AuthState } from '../store/auth/types'

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
    getSessionUser: async (auth: AuthState) => {
        dispatch(getSessionUser(auth))
    }
})

const PrivateRoute : React.FC<PrivateRouteProps> = (props) => {
    const { auth, getSessionUser, component, ...rest } = props;

    useEffect(() => {
        //console.log('querying session user')

        // note: getSessionUser gets called once per PrivateRoute instance
        // I could move this block where Router is configured, that is in App component,
        // but I prefer here because App would get cluttered
        getSessionUser(auth)
    }, [])

    const InnerComponent = component

    return <Route {...rest} render={(props) => {
        if (auth.state === QueryState.setup) {
            return <Loading/>
        }

        if (auth.loggedIn) {
            return <InnerComponent {...props}/>
        }

        return <WelcomePage/>
    }}/>
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
