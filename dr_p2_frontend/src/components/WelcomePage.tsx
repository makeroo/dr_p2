import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import * as H from 'history';
import { useEffect } from 'react'

import { AppState } from '../store/index'

import { login } from '../store/auth/actions'
import { requestPath } from '../store/signin/actions'

interface WelcomePageOwnProps {
  history: H.History
}

const mapStateToProps = (state: AppState, props: WelcomePageOwnProps) => ({
  path: props.history.location.pathname,
  push: props.history.push,
  requestedPath: state.signIn.requestedPath
})

type WelcomePageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  storePath: (path: string) => {
    dispatch(requestPath(path))
  },

  login: async (name: string) => {
      const p = dispatch(login(name))

      console.log('Login completed [UI]')

      return p;
    }
})

const WelcomePage: React.FC<WelcomePageProps> = (props) => {

  useEffect(() => {
    console.log(props)

    const currentPath = props.path;

    props.storePath(currentPath === '/' ? '/problem/new' : currentPath)
  })

  const login = () => {
    props.login('pippo').then(() => {
      props.push(props.requestedPath)
    })
  };

  return (
    <div className="welcome-page">
      welcome page
      <div>login <button onClick={login}>Login as pippo</button></div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
