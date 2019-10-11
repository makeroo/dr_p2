import React, { useRef } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'

import i18n from 'i18next'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { login } from '../store/auth/actions'
import { QueryState } from '../store/auth/types'
import { RootState } from '../store'

type WelcomePageProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: RootState) => ({
    state: state.auth.state
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    login: async (name: string) => {
        return dispatch(login(name))
    }
})

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
    const { login } = props

    const inputEl = useRef<HTMLInputElement>(null);

    const handleLogin = () => {
        if (inputEl && inputEl.current) {
            login(inputEl.current.value)
        }
    }

    return (
        <Container>
            <Typography>{i18n.t('Welcome on Democracy Revisited')}</Typography>
            <Typography>{i18n.t('Type in your name and start to discuss')}</Typography>
            <TextField inputRef={inputEl}></TextField>
            { props.state === QueryState.done ?
              <Button variant="contained" color="primary" onClick={handleLogin}>{i18n.t('signin')}</Button>
              :
              <CircularProgress/>
            }
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
