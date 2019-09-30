import React from 'react'
import { ComponentType } from 'react'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from '../store/index'
import { AuthActionTypes } from '../store/auth/types'

import { login } from '../store/auth/actions'

// this is what PrivateRoute fc receives
type PrivateRouteProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    login: async (name: string) => {
        await dispatch(login(name))
        console.log('Login completed [UI]')
    }
/*     (name: string) => {
        dispatch(declareName(name))
    }*/
})

/*
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
  return {
    login: async (username, password) => {
      await dispatch(login(username, password))
      console.log('Login completed [UI]')
    }
  }
}
*/

const PrivateRoute : React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { auth, component, ...rest } = props;

    const login = () => {
        props.login('pippo')
    };

    const InnerComponent = component

    return <Route {...rest} render={() => (
        auth.loggedIn ?
            <div>
                <div>Hi, {auth.userName}</div>
                <InnerComponent ></InnerComponent>
            </div>
            :
            <div>login <button onClick={login}>Login as pippo</button></div>
    )}/>
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

/*
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
);
*/
