import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../../store'
import { RouteComponentProps } from 'react-router'
import { ThunkDispatch } from 'redux-thunk'
import { Typography, Container, Grid, Link } from '@material-ui/core'
import i18n from '../../../i18n'
import { VotedThesis } from '../../../store/discussion/types'
import RelatedTheses from './RelatedTheses'


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

const ThesisExplorer : React.FC<ThesisPageProps> = (props) => {
    const { discussion, thesis } = props

    if (!thesis) {
        return (
            <Container>
                <Typography>{i18n.t('thesis not found')}</Typography>
                <Link href={`/problem/${discussion.id}`}>{i18n.t('return to discussion')}</Link>
            </Container>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{thesis.thesis.content}</Typography>
            </Grid>
            <Grid item xs={12}>
                <RelatedTheses/>
            </Grid>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ThesisExplorer)
