import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Route } from 'react-router-dom'
import { useEffect } from 'react'
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


interface DiscussionRoutingParams {
    id: string
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<DiscussionRoutingParams>) => {
    return {
        query_id: +props.match!.params.id,
        baseUrl: props.match!.url,
        loading: state.discussion.loading,
        discussion: state.discussion.discussion,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getDiscussion: async (id: number) => {
        dispatch(actions.discussion.getDiscussion(id))
    }
})

type DiscussionPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<DiscussionRoutingParams>

const DiscussionPage: React.FC<DiscussionPageProps> = (props) => {
    const { query_id, loading, discussion, getDiscussion, baseUrl } = props

    useEffect(() => {
        //console.log('check if query id matches discussion id')

        if (loading ||
            (discussion && discussion.id === query_id)
            ) {
            return
        }

        //console.log('loading discussion', query_id)

        getDiscussion(query_id)
    }, [loading, discussion, getDiscussion, query_id])

    return (!discussion ?
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
                        <Typography>{discussion.question}</Typography>
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
