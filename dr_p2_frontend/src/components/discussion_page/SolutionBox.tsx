import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import { supportToSolutionDialog } from '../../store/explorer/actions';

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis,
    pinnedThesis: state.explorer.pinnedThesis,
    pinnedThesisSupports: state.explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.supports[state.explorer.pinnedThesis.id]
    ) : [],
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    supportToSolutionDialog: (solution: Thesis) => {
        dispatch(supportToSolutionDialog(solution))
    }
})

type SolutionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        solution: {
            margin: theme.spacing(.25),
        },
        content: {
            minHeight: '4em',
        },
    }),
)

const SolutionBox : React.FC<SolutionsProps> = (props) => {
    const classes = useStyles()

    const { thesis, pinnedThesis, supportToSolutionDialog, pinnedThesisSupports } = props

    const handleClick = () => {
        if (!pinnedThesis) {
            console.log('pin a thesis first') // TODO: notify user
        } else if (pinnedThesisSupports && pinnedThesisSupports.indexOf(thesis.id) >= 0) {
            console.log('thesis already supports solution') // TODO: notify user
        } else {
            supportToSolutionDialog(thesis)
        }
    }

    return (
        <Card className={classes.solution}>
            <CardActionArea className={classes.content} onClick={handleClick}>
                <Typography paragraph>{thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionBox)
