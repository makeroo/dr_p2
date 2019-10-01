import React from 'react'
import { ComponentType } from 'react'
import { Route } from "react-router-dom"
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'

import { AppState } from '../store/index'

import WelcomePage from './WelcomePage'

// this is what PrivateRoute fc receives
type PrivateRouteProps = ReturnType<typeof mapStateToProps>

// these are any properties declared in jsx nodes
interface PrivateRouteTagProps {
    component: ComponentType
    [x: string]: any
}

// this is where I build PR props from both state and jsx
const mapStateToProps = (state: AppState, props: PrivateRouteTagProps) => ({
    auth: state.auth,
    ...props
})

const PrivateRoute : React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { auth, component, ...rest } = props;

    const InnerComponent = component

    return <Route {...rest} render={(props: RouteComponentProps) => (
        auth.loggedIn ?
            <div>
                <div>Hi, {auth.userName}</div>
                <InnerComponent ></InnerComponent>
            </div>
            :
            <WelcomePage history={props.history}/>
    )}/>
}

export default connect(mapStateToProps)(PrivateRoute);
