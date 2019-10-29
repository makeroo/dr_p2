import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import ShareIcon from '@material-ui/icons/Share'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
//import ThumbDownIcon from '@material-ui/icons/ThumbDown'
//import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types';
import { Theme, makeStyles, createStyles, IconButton, Typography } from '@material-ui/core'

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
})

type SolutionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

// TODO: move into theme
const selectedColor = 'gold' // deepskyblue

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        thesis: {
            minHeight: '4em',
            position: 'relative',
            margin: theme.spacing(.25),
        },
        share: {
            padding: '0 0 0 4px',
            float: 'right',
            '&.selected': {
                color: selectedColor,
            }
        },
        up: {
            padding: 0,
            float: 'left',
            '&.selected': {
                color: selectedColor,
            }
        },
        down: {
            padding: '0 4px',
            float: 'left',
            '&.selected': {
                color: selectedColor,
            }
        },
    }),
)

const ThesisBox : React.FC<SolutionsProps> = (props) => {
    const classes = useStyles()

    const { thesis } = props

    return (
        <Paper className={classes.thesis}>
            <IconButton className={classes.share}>
                <ShareIcon/>
            </IconButton>
            <IconButton className={classes.up}>
                <ThumbUpAltOutlinedIcon/>
            </IconButton>
            <IconButton className={classes.down}>
                <ThumbDownAltOutlinedIcon/>
            </IconButton>
            <Typography>{thesis.content}</Typography>
        </Paper>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisBox)
