import React from 'react'
import { connect } from 'react-redux'
import { match, RouteComponentProps } from 'react-router-dom'

import { AppState } from '../store/index'

interface DiscussionRoutingParams {
    id: string
}

const mapStateToProps = (state: AppState, props: RouteComponentProps<DiscussionRoutingParams>) => {
    return {
        id: props.match!.params.id
    }
}

type DiscussionPageProps = ReturnType<typeof mapStateToProps> & RouteComponentProps<DiscussionRoutingParams>

const DiscussionPage: React.FC<DiscussionPageProps> = (props) => {
    return <div>disc page todo: {props.id}</div>
}

export default connect(mapStateToProps)(DiscussionPage)
