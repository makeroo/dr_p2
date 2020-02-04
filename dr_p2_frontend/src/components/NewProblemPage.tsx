import React, { useRef, Dispatch } from 'react';
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'

import i18n from 'i18next'

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import ButtonWithLoading from '../utils/components/ButtonWithLoading'

import { RootState } from '../store/index'
import { newProblem } from '../saga';

type NewProblemPageProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: RootState) => ({
    loading: state.discussion.loading
})

const mapDispatchToProps = (dispatch: Dispatch<any>, props: RouteComponentProps) => ({
    newProblem: async (question: string) => {
        dispatch(newProblem(question, props.history))
    }
})

const NewProblemPage: React.FC<NewProblemPageProps> = (props) => {
    const { newProblem } = props

    const inputEl = useRef<HTMLInputElement>(null);

    const handleCreateProblem = () => {
        // TODO: validate form, question is required

        if (inputEl && inputEl.current) {
            newProblem(inputEl.current.value)
        }
    }

    return (
        <Container>
            <Typography>{i18n.t('Create a new problem to be discussed.')}</Typography>
            <Typography>{i18n.t('Type in your question:')}</Typography>
            <TextField
                inputRef={inputEl}
                InputProps={{
                    readOnly: props.loading,
                }}
                />
            <ButtonWithLoading
                loading={props.loading}
                success={false}
                label={i18n.t('start')}
                onClick={handleCreateProblem}
                />
       </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProblemPage)
