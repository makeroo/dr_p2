import React, { Dispatch } from 'react'
import { connect } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AppState } from '../../store/index'
import { VotedThesis } from '../../store/discussion/types';
import { Card, CardActionArea, Typography } from '@material-ui/core';
import { findThesis } from '../../store/discussion/utils';
import { supportToSolutionDialog } from '../../store/discussion_explorer/actions';

const mapStateToProps = (state: AppState, props: { thesis: VotedThesis }) => ({
    thesis: props.thesis,
    pinnedThesis: state.discussion_explorer.pinnedThesis,
    pinnedThesisSupports: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.supports[state.discussion_explorer.pinnedThesis.thesis.id]
    ) : [],
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    supportToSolutionDialog: (solution: VotedThesis) => {
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
        } else if (pinnedThesisSupports && findThesis(thesis.thesis.id, pinnedThesisSupports)) {
            console.log('thesis already supports solution') // TODO: notify user
        } else {
            supportToSolutionDialog(thesis)
        }
    }

    return (
        <Card className={classes.solution}>
            <CardActionArea className={classes.content} onClick={handleClick}>
                <Typography paragraph>{thesis.thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionBox)
