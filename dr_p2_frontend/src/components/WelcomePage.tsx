import React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'

import { login } from '../store/auth/actions'

type WelcomePageProps = ReturnType<typeof mapDispatchToProps>

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    login: async (name: string) => {
        dispatch(login(name))
    }
})

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { login } = props

    const handleLogin = () => {
        login('pippo')
        console.log('Login completed [UI]')
    }

    return (
        <div className="welcome-page">
            welcome page
            <div>login <button onClick={handleLogin}>Login as pippo</button></div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(WelcomePage)
