import React from 'react'
import { ComponentType } from 'react'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'

import { AppState } from '../store/index'

import WelcomePage from './WelcomePage'

// this is what PrivateRoute fc receives
type PrivateRouteProps = ReturnType<typeof mapStateToProps>

// these are any properties declared in jsx nodes
interface PrivateRouteTagProps {
    component: ComponentType<any> // TODO: either null or RouteComponentProps
    [x: string]: any // TODO: actually, the properties of Route
}

// this is where I build PR props from both state and jsx
const mapStateToProps = (state: AppState, props: PrivateRouteTagProps) => ({
    auth: state.auth,
    ...props
})

const PrivateRoute : React.FC<PrivateRouteProps> = (props) => {
    const { auth, component, ...rest } = props;

    const InnerComponent = component

    return <Route {...rest} render={(props) => (
        auth.loggedIn ?
            <InnerComponent {...props}/>
            :
            <WelcomePage/>
    )}/>
}

export default connect(mapStateToProps)(PrivateRoute)
/*
second version: try to define component type

interface X {
    id: string
}

interface PrivateRouteTagProps2 {
    component: ComponentType<X>
    [x: string]: any
}

const mapStateToProps2 = (state: AppState, props: PrivateRouteTagProps2) => ({
    auth: state.auth,
    ...props
})

type PrivateRouteProps2 = ReturnType<typeof mapStateToProps2>

const PrivateRoute2 : React.FC<PrivateRouteProps2> = (props) => {
    const { auth, component, ...rest } = props;

    const InnerComponent = component

    return <Route {...rest} render={(props) => (
        auth.loggedIn ?
            <InnerComponent {...props.match!.params}/>
            :
            <WelcomePage/>
    )}/>
}

export const PrivateRoute2C = connect(mapStateToProps2)(PrivateRoute2)

// third version: generic version of PrivateRoute, failed

interface PrivateRouteTagProps3<T> {
    component: ComponentType<T>
    [x: string]: any
}

function mapStateToProps3<T> (state: AppState, props: PrivateRouteTagProps3<T>) {
    return {
        auth: state.auth,
        ...props
    }
}

type PrivateRouteProps3<P> = ReturnType<typeof mapStateToProps3>

class PrivateRoute3<P = {}> extends React.Component<PrivateRouteProps3<P>> {
    constructor(props: PrivateRouteProps3<P>) {
        super(props)
    }

    public render () {
        const { auth, component, ...rest } = this.props;

        const InnerComponent = component
    
        return <Route {...rest} render={(props) => (
            auth.loggedIn ?
                <InnerComponent {...props.match!.params}/>
                :
                <WelcomePage/>
        )}/>
    }
}

function connectPrivateRoute3<T> () {
    return connect(mapStateToProps3)(PrivateRoute3<T>)
}
*/
