import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import i18n from 'i18next'

import { AppState } from '../store/index'
import actions from '../context'
import Solutions from './discussion_page/Solutions'
import ThesisExplorer from './discussion_page/thesis_explorer/ThesisExplorer'
import useUrlAndStateSyncer from '../utils/url_and_state_syncer_effect'


interface DiscussionRoutingParams {
    id: string
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<DiscussionRoutingParams>) => {
    return {
        query_id: +props.match!.params.id,
        baseUrl: props.match!.url,
        loading: state.discussion.loading,
        pid: state.discussion.id,
        question: state.discussion.question,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getDiscussion: async (id: number) => dispatch(actions.discussion.getDiscussion(id))
})

type DiscussionPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<DiscussionRoutingParams>


const DiscussionPage: React.FC<DiscussionPageProps> = (props) => {
    const { query_id, loading, pid, question, getDiscussion, baseUrl } = props

    //console.log('SOLU rendering dp', query_id)

    useUrlAndStateSyncer(
        () => loading || (pid !== undefined && pid === query_id),
        () => getDiscussion(query_id)
    )

    return (!pid ?
        <Container>
            <Typography>{i18n.t('loading discussion')}</Typography>
            <CircularProgress/>
        </Container>
        :
        <React.Fragment>
            <Route path={`${baseUrl}/thesis/:tid`} component={ThesisExplorer}/>
            <Route exact path={`${baseUrl}`}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{question}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Solutions/>
                    </Grid>
                </Grid>
            </Route>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPage)
