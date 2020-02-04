import React, { useRef, Dispatch } from 'react'
import { connect } from 'react-redux'

import i18n from 'i18next'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ButtonWithLoading from '../utils/components/ButtonWithLoading'

import { QueryState } from '../store/auth/types'
import { RootState } from '../store'
import { login } from '../saga'

type WelcomePageProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: RootState) => ({
    state: state.auth.state
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
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
            <ButtonWithLoading
            loading={props.state === QueryState.signingIn}
            success={false}
            label={i18n.t('signin')}
            onClick={handleLogin}
            />
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
