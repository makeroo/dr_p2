import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types';

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
})

type SolutionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        solution: {
            minHeight: '4em',
            margin: theme.spacing(.25),
        },
    }),
)

const SolutionBox : React.FC<SolutionsProps> = (props) => {
    const classes = useStyles()

    const { thesis } = props

    return <Paper className={classes.solution}>{thesis.content}</Paper>
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionBox)
