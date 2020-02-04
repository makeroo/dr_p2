import React, { Dispatch } from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'

import i18n from '../../i18n'

//import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

import { AppState } from '../../store/index'
import { VotedThesis, Vote } from '../../store/discussion/types'
import { Theme, makeStyles, createStyles, IconButton, Typography, Card, CardActionArea, CardActions, Popover } from '@material-ui/core'
import { findThesis } from '../../store/discussion/utils'
import { pinThesis, relationBetweenThesesDialog } from '../../store/discussion_explorer/actions'
import { postVote } from '../../saga'


interface ThesisBoxAttributes {
    thesis: VotedThesis
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<{}> & ThesisBoxAttributes) => ({
    history: props.history,
    thesis: props.thesis,
    pid: state.discussion.id,
    selected: state.discussion_explorer.pinnedThesis === props.thesis,
    pinnedThesis: state.discussion_explorer.pinnedThesis,
    pinnedThesisSupports: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.supports[state.discussion_explorer.pinnedThesis.thesis.id] || []
    ) : [],
    pinnedThesisContradictions: state.discussion_explorer.pinnedThesis && state.discussion.indexedDiscussion ? (
        state.discussion.indexedDiscussion.contradictions[state.discussion_explorer.pinnedThesis.thesis.id] || []
    ) : [],
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    pinMe: (thesis: VotedThesis | null) => {
        dispatch(pinThesis(thesis))
    },
    relationBetweenThesesDialog: (thesis: VotedThesis, canAddSupport: boolean, canAddContradiction: boolean) => {
        dispatch(relationBetweenThesesDialog(thesis, canAddSupport, canAddContradiction))
    },
    postVote: (votedThesis: VotedThesis, vote: Vote) => dispatch(postVote(votedThesis, vote))
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
        votetitle: {
            padding: theme.spacing(1)
        },
        votes: {
            display: 'flex',
            justifyContent: 'center',
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

    const { thesis, selected, pinMe, pinnedThesis, pinnedThesisSupports, pinnedThesisContradictions, relationBetweenThesesDialog, history, pid, postVote } = props

    const shareClass = selected ? `${classes.share} selected` : classes.share

    const [votePopoverAnchorEl, setvotePopoverAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    let VoteIcon = ThumbsUpDownIcon
    let voteClass = classes.down
    let voteUpClass = classes.down
    let voteSeenClass = classes.down
    let voteDownClass = classes.down

    switch (thesis.vote.vote) {
    case Vote.Down:
        VoteIcon = ThumbDownIcon
        voteClass += " selected"
        voteDownClass += " selected"
        break
    case Vote.Seen:
        VoteIcon = PlaylistAddIcon
        voteClass += " selected"
        voteSeenClass += " selected"
        break
    case Vote.Up:
        VoteIcon = ThumbUpIcon
        voteClass += " selected"
        voteUpClass += " selected"
        break
    case null:
        //VoteIcon = ThumbsUpDownIcon
        break
    }

    const togglePin = () => {
        // TODO: if there is a selected thesis and it's not me then propose relation
        pinMe(selected ? null : thesis)
    }

    const handleClick = () => {
        if (!pinnedThesis) {
            history.push(`/problem/${pid}/thesis/${thesis.thesis.id}`)

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

    const handleVoteFeedbackClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setvotePopoverAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setvotePopoverAnchorEl(null)
    }

    const handleVoteUp = () => {
        postVote(thesis, Vote.Up)

        setvotePopoverAnchorEl(null)
    }

    const handleVoteSeen = () => {
        postVote(thesis, Vote.Seen)
        
        setvotePopoverAnchorEl(null)
    }

    const handleVoteDown = () => {
        postVote(thesis, Vote.Down)

        setvotePopoverAnchorEl(null)
    }

    const votePopoverOpen = Boolean(votePopoverAnchorEl)
    const votePopoverId = votePopoverOpen ? 'simple-popover' : undefined

    return (
        <Card className={classes.thesis}>
            <CardActions>
                <IconButton className={voteClass} onClick={handleVoteFeedbackClick}>
                    <VoteIcon/>
                </IconButton>
                <Popover
                    id={votePopoverId}
                    open={votePopoverOpen}
                    anchorEl={votePopoverAnchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                    <Typography className={classes.votetitle}>{i18n.t('vote or change your vote')}</Typography>
                    <div className={classes.votes}>
                        <IconButton className={voteUpClass} onClick={handleVoteUp}>
                            <ThumbUpAltOutlinedIcon/>
                        </IconButton>
                        <IconButton className={voteSeenClass} onClick={handleVoteSeen}>
                            <PlaylistAddIcon/>
                        </IconButton>
                        <IconButton className={voteDownClass} onClick={handleVoteDown}>
                            <ThumbDownAltOutlinedIcon/>
                        </IconButton>
                    </div>
                </Popover>
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
