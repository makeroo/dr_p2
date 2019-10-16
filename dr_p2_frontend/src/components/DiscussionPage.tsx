import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk'

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import i18n from 'i18next'

import { AppState } from '../store/index'
import { getDiscussion } from '../store/discussion/actions'
import Solutions from './discussion_page/Solutions'

interface DiscussionRoutingParams {
    id: string
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<DiscussionRoutingParams>) => {
    return {
        query_id: +props.match!.params.id,
        loading: state.discussion.loading,
        discussion: state.discussion.discussion
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getDiscussion: async (id: number) => {
        dispatch(getDiscussion(id))
    }
})

type DiscussionPageProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps<DiscussionRoutingParams>

const DiscussionPage: React.FC<DiscussionPageProps> = (props) => {
    const { query_id, loading, discussion, getDiscussion } = props

    useEffect(() => {
        //console.log('check if query id matches discussion id')

        if (loading ||
            (discussion && discussion.id === query_id)
            ) {
            return
        }

        getDiscussion(query_id)
    }, [])

    return (loading || !discussion ?
        <Container>
            <Typography>{i18n.t('loading discussion')}</Typography>
            <CircularProgress/>
        </Container>
        :
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>{discussion.question}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Solutions/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPage)
