import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import { RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { Typography, Container, Grid, Theme } from '@material-ui/core'
import i18n from '../../../i18n'
import { VotedThesis } from '../../../store/discussion/types'
import RelatedTheses from './RelatedTheses'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import { makeStyles, createStyles } from '@material-ui/styles'

interface ThesisRoutingParams {
    tid: string
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<ThesisRoutingParams>) => {
    const indexedDiscussion = state.discussion.indexedDiscussion
    const thesis_id = +props.match!.params.tid
    let thesis : VotedThesis | null

    if (indexedDiscussion) {
        thesis = indexedDiscussion.theses[thesis_id]
    } else {
        thesis = null
    }

    return {
        // it's safe ! here because ThesisExplorer is included by DiscussionPage
        // only when discussion has been fully loaded
        discussion: state.discussion.discussion!,
        thesis,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
})

type ThesisPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        back: {
            float: 'left',
            padding: theme.spacing(1),
            color: 'inerit',
        },
    }),
)

const ThesisExplorer : React.FC<ThesisPageProps> = (props) => {
    const classes = useStyles()

    const { discussion, thesis } = props

    if (!thesis) {
        return (
            <Container>
                <Typography>{i18n.t('thesis not found')}</Typography>
                <Link to={`/problem/${discussion.id}`}>{i18n.t('return to discussion')}</Link>
            </Container>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Link to={`/problem/${discussion.id}`} aria-label="back" className={classes.back}><ZoomOutMapIcon/></Link>
                    {/*DynamicFeed, HomeWork LibraryBooks MeetingRoom QuestionAnswer ZoomOutMap*/}
                <Typography>{thesis.thesis.content}</Typography>
            </Grid>
            <Grid item xs={12}>
                <RelatedTheses/>
            </Grid>
        </Grid>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThesisExplorer))
