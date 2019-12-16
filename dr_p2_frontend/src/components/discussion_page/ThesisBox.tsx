import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { withRouter, RouteComponentProps } from 'react-router'

//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
//import ThumbDownIcon from '@material-ui/icons/ThumbDown'
//import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'

import { AppState } from '../../store/index'
import { VotedThesis } from '../../store/discussion/types';
import { Theme, makeStyles, createStyles, IconButton, Typography, Card, CardActionArea, CardActions } from '@material-ui/core'
import { findThesis } from '../../store/discussion/utils'
import actions from '../../context'


interface ThesisBoxAttributes {
    thesis: VotedThesis
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<{}> & ThesisBoxAttributes) => ({
    history: props.history,
    baseUrl: props.match!.url,
    thesis: props.thesis,
    selected: state.discussion_explorer.pinnedThesis === props.thesis,
    pinnedThesis: state.discussion_explorer.pinnedThesis,
    pinnedThesisSupports: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.supports[state.discussion_explorer.pinnedThesis.thesis.id] || []
    ) : [],
    pinnedThesisContradictions: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.contradictions[state.discussion_explorer.pinnedThesis.thesis.id] || []
    ) : [],
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    pinMe: (thesis: VotedThesis | null) => {
        dispatch(actions.discussion_explorer.pinThesis(thesis))
    },
    relationBetweenThesesDialog: (thesis: VotedThesis, canAddSupport: boolean, canAddContradiction: boolean) => {
        dispatch(actions.discussion_explorer.relationBetweenThesesDialog(thesis, canAddSupport, canAddContradiction))
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

    const { thesis, selected, pinMe, pinnedThesis, pinnedThesisSupports, pinnedThesisContradictions, relationBetweenThesesDialog, history, baseUrl } = props

    const shareClass = selected ? `${classes.share} selected` : classes.share

    const togglePin = () => {
        // TODO: if there is a selected thesis and it's not me then propose relation
        pinMe(selected ? null : thesis)
    }

    const handleClick = () => {
        if (!pinnedThesis) {
            history.push(`${baseUrl}/thesis/${thesis.thesis.id}`)

            return
        }

        const canAddSupport = !findThesis(thesis.thesis.id, pinnedThesisSupports)
        const canAddContradiction = !findThesis(thesis.thesis.id, pinnedThesisContradictions)

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
                <Typography>{thesis.thesis.content}</Typography>
            </CardActionArea>
        </Card>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThesisBox))
