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
import { Theme, makeStyles, createStyles, IconButton, Typography, Card, CardActionArea, CardActions } from '@material-ui/core'
import { pinThesis, relationBetweenThesesDialog } from '../../store/discussion_explorer/actions'

const mapStateToProps = (state: AppState, props: { thesis: Thesis }) => ({
    thesis: props.thesis,
    selected: state.discussion_explorer.pinnedThesis === props.thesis,
    pinnedThesis: state.discussion_explorer.pinnedThesis,
    pinnedThesisSupports: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.supports[state.discussion_explorer.pinnedThesis.id] || []
    ) : [],
    pinnedThesisContradictions: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.contradictions[state.discussion_explorer.pinnedThesis.id] || []
    ) : [],
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    pinMe: (thesis: Thesis | null) => {
        dispatch(pinThesis(thesis))
    },
    relationBetweenThesesDialog: (thesis: Thesis, canAddSupport: boolean, canAddContradiction: boolean) => {
        dispatch(relationBetweenThesesDialog(thesis, canAddSupport, canAddContradiction))
    }
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

    const { thesis, selected, pinMe, pinnedThesis, pinnedThesisSupports, pinnedThesisContradictions, relationBetweenThesesDialog } = props

    const shareClass = selected ? `${classes.share} selected` : classes.share

    const togglePin = () => {
        // TODO: if there is a selected thesis and it's not me then propose relation
        pinMe(selected ? null : thesis)
    }

    const handleClick = () => {
        if (!pinnedThesis) {
            console.log('pin a thesis first') // TODO: notify user
            return
        }

        const canAddSupport = pinnedThesisSupports.indexOf(thesis.id) === -1
        const canAddContradiction = pinnedThesisContradictions.indexOf(thesis.id) === -1

        if (!canAddSupport && !canAddContradiction) {
            console.log('pinned thesis already supports *and* contradicts me') // TODO: notify user

            return
        }

        relationBetweenThesesDialog(thesis, canAddSupport, canAddContradiction)
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
            <CardActionArea onClick={handleClick}>
                <Typography>{thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisBox)
