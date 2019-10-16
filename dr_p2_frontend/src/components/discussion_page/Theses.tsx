import React from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'

import i18n from 'i18next'

import { AppState } from '../../store/index'
import { Thesis } from '../../store/discussion/types'

interface ThesesIndex {
    [sol: number]: Thesis
}

interface SupportingTheses {
    [sol: number]: Thesis[]
}

const mapStateToProps = (state: AppState) => {
    var solutions : Thesis[] = []

    var theses : ThesesIndex = {}
    var unrelated : Thesis[] = []

    for (let thesis of state.discussion.discussion!.theses) {
        if (thesis.solution) {
            solutions.push(thesis)
        } else {
            for (let relation of state.discussion.discussion!.relations) {

            }
        }
    }

    return {
        solutions,
        theses,
        unrelated
    }
}

type SolutionsProps = ReturnType<typeof mapStateToProps>

const Theses : React.FC<SolutionsProps> = (props) => {
    const { solutions } = props

    if (solutions.length === 0) {
        return (
            <Container>
                <Typography>{i18n.t('no solutions yet')}</Typography>
                <Fab></Fab>
            </Container>
        )
    }

    return <div></div>
}

export default connect(mapStateToProps)(Theses)
