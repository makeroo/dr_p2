import React from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import i18n from 'i18next'

import { AppState } from '../../store/index'
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme'

const mapStateToProps = (state: AppState) => ({
    //theses: state.discussion.discussion!.theses.filter((thesis) => (!thesis.solution))
    //discussion: state.discussion.discussion!,
    indexedDiscussion: state.discussion.indexedDiscussion!,
    page: state.explorer.page,
})

type SolutionsProps = ReturnType<typeof mapStateToProps>

const Solutions : React.FC<SolutionsProps> = (props) => {
    const { indexedDiscussion } = props
    var { page } = props
    const { solutions, theses, invertedSupports } = indexedDiscussion

    const theme = useTheme<Theme>()
    let visibleSolutions

    const isSmall = useMediaQuery(theme.breakpoints.down('md'))
    const isMedium = useMediaQuery(theme.breakpoints.down('lg'))

    if (isSmall) {
        visibleSolutions = 1
    } else if (isMedium) {
        visibleSolutions = 3;
    } else {
        visibleSolutions = 6;
    }

    let pages = Math.ceil(solutions.length / visibleSolutions)

    if (pages === 0) {
        return (
            <Container>
                <Typography>{i18n.t('no solutions yet')}</Typography>
                <Fab></Fab>
            </Container>
        )
    }

    if (page < 0) {
        page = 0;
    } else if (page >= pages) {
        page = pages - 1;
    }

    let columns : JSX.Element[] = []

    for (let i = 0; i < visibleSolutions; ++i) {
        const solution = solutions[page * visibleSolutions + i];

        const thesesElements : JSX.Element[] = []

        for (let thesisId of invertedSupports[solution.id]) {
            const thesis = theses[thesisId]

            thesesElements.push(
                <Grid item xs={12}>
                    <Paper>{thesis.content}</Paper>
                </Grid>
            )
        }

        columns.push(
            <Grid item container xs={12} md={4} lg={1}>
                <Grid item xs={12}>
                    <Paper>{solution.content}</Paper>
                </Grid>
                <Grid item xs={12} container>
                    { thesesElements }
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container>
            { columns }
        </Grid>
    )
}

export default connect(mapStateToProps)(Solutions)
