import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { AppState } from "../../../store"

const mapStateToProps = (state: AppState) => {
    return {
        discussion: state.discussion.discussion,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
})

type RelatedThesesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>


const RelatedTheses: React.FC<RelatedThesesProps> = (props) => {
    
    return <div>TODO</div>
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTheses)
