import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
//import ThumbDownIcon from '@material-ui/icons/ThumbDown'
//import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types';
import { Theme, makeStyles, createStyles, IconButton, Typography, Card, CardActionArea, CardHeader, CardActions } from '@material-ui/core'
import { pinThesis } from '../../store/explorer/actions'

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis,
    selected: state.explorer.pinnedThesis === props.thesis,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    pinMe: (thesis: Thesis | null) => {
        dispatch(pinThesis(thesis))
    },
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
            marginLeft: 'auto',
            '&.selected': {
                color: selectedColor,
            }
        },
        up: {
            '&.selected': {
                color: selectedColor,
            }
        },
        down: {
            '&.selected': {
                color: selectedColor,
            }
        },
    }),
)

const ThesisBox : React.FC<SolutionsProps> = (props) => {
    const classes = useStyles()

    const { thesis, selected, pinMe } = props

    const shareClass = selected ? `${classes.share} selected` : classes.share

    const togglePin = () => {
        // TODO: if there is a selected thesis and it's not me then propose relation
        pinMe(selected ? null : thesis)
    }

    return (
        <Card className={classes.thesis}>
            <CardActions>
                <IconButton className={classes.up}>
                    <ThumbUpAltOutlinedIcon/>
                </IconButton>
                <IconButton className={classes.down}>
                    <ThumbDownAltOutlinedIcon/>
                </IconButton>
                <IconButton className={shareClass} onClick={togglePin}>
                    <ShareIcon/>
                </IconButton>
            </CardActions>
            <CardActionArea>
                <Typography>{thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisBox)
