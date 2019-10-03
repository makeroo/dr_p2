import React from 'react'
import { ComponentType, useEffect } from 'react'
import { Route, withRouter } from "react-router-dom"
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../store/index'

import WelcomePage from './WelcomePage'
import { requestPath } from '../store/signin/actions'

// this is what PrivateRoute fc receives
type PrivateRouteProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps

// these are any properties declared in jsx nodes
interface PrivateRouteTagProps {
    component: ComponentType
    [x: string]: any
}

// this is where I build PR props from both state and jsx
const mapStateToProps = (state: AppState, props: PrivateRouteTagProps) => ({
    auth: state.auth,
    requestedPath: state.signIn.requestedPath,
    ...props
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    storePath: (path: string) => {
      dispatch(requestPath(path))
    },
})

const PrivateRoute : React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { auth, requestedPath, component, history, ...rest } = props;

    useEffect(() => {
        if (!requestedPath || requestedPath === '/') {
            console.log('no requestedPath found, storing current', props)

            const currentPath = props.history.location.pathname;

            props.storePath(currentPath === '/' ? '/problem/new' : currentPath)

        } else {
            console.log('requestedPath found, ignoring current', props)
        }
    })

    const InnerComponent = component

    return <Route {...rest} render={() => {

        auth.loggedIn ?
            <div>
                <div>Hi, {auth.userName}</div>
                <InnerComponent ></InnerComponent>
            </div>
            :
            <WelcomePage/>
    }}/>
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PrivateRoute))
