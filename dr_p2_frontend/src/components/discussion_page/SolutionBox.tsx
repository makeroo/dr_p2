import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types';
import { Card, CardActionArea, Typography } from '@material-ui/core';

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis,
    pinnedThesis: state.explorer.pinnedThesis,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
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

    const { thesis, pinnedThesis } = props

    const handleClick = () => {
        if (pinnedThesis) {
            
        }
    }

    return (
        <Card className={classes.solution}>
            <CardActionArea className={classes.content} onClick={handleClick}>
                <Typography paragraph>{thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
    
    //<Paper>{thesis.content}</Paper>
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionBox)
