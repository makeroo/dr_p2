import React, { useRef } from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import i18n from 'i18next'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { newProblem } from '../store/discussion/actions'
import { RootState } from '../store/index'

type NewProblemPageProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: RootState, props: RouteComponentProps) => ({
    history: props.history,
    loading: state.discussion.loading
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    newProblem: async (question: string) => {
        return dispatch(newProblem(question))
    }
})

const NewProblemPage: React.FC<NewProblemPageProps> = (props) => {
    const { newProblem, history } = props

    const inputEl = useRef<HTMLInputElement>(null);

    const handleCreateProblem = () => {
        if (inputEl && inputEl.current) {
            newProblem(inputEl.current.value).then((v) => {
                //console.log('newproblem result:', v)
                history.push(`/problem/${v}`)
            }).catch((error) => {
                console.log('new problem failed', error)
            })
        }
    }

    return (
        <Container>
            <Typography>{i18n.t('Create a new problem to be discussed.')}</Typography>
            <Typography>{i18n.t('Type in your question:')}</Typography>
            <TextField inputRef={inputEl}></TextField>
            { props.loading ?
                <CircularProgress/>
                :
                <Button variant="contained" color="primary" onClick={handleCreateProblem}>{i18n.t('start')}</Button>
            }
       </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProblemPage)
