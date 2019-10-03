import React from 'react'
import { connect } from 'react-redux'
import { match, RouteComponentProps } from 'react-router-dom'

import { AppState } from '../store/index'

interface DiscussionRoutingParams {
    id: string
}

const mapStateToProps = (state: AppState, props: DiscussionRoutingParams) => {
    // later...
    console.log(state, props)
    return {}
}

type DiscussionPageProps = ReturnType<typeof mapStateToProps> // & RouteComponentProps<DiscussionRoutingParams>

const DiscussionPage: React.FC<DiscussionPageProps> = (props) => {
    return <div>disc page todo: {/*props.match!.params.id*/}</div>
}

export default connect(mapStateToProps)(DiscussionPage)
