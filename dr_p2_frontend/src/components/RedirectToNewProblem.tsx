import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'

const RedirectToNewProblem: React.FC<RouteComponentProps> = (props) => {
    props.history.push('/problem')

    return <div/>
}

export default withRouter(RedirectToNewProblem)
