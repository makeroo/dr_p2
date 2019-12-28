import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import { useTheme } from '@material-ui/styles'

import { AppState } from "../../../store"
import { relatedTheses } from '../../../store/thesis_explorer/utils'
import actions from '../../../context'
import { VotedThesis, ThesesIndex, ThesisRelation } from '../../../store/discussion/types'
import ThesisBox from '../ThesisBox'
import i18n from '../../../i18n'

const mapStateToProps = (state: AppState) => {
    return {
        indexedDiscussion: state.discussion.indexedDiscussion,
        referenceThesis: state.thesis_explorer.referenceThesis,
        page: state.thesis_explorer.page
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    gotoPage: (page: number) => {
        return dispatch(actions.theses_explorer.selectPage(page))
    },
})

type RelatedThesesProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(1),
            right: theme.spacing(1),
        },
        thesis: {
            border: 0,
            outline: 'none',
        },
        prevPage: {
            width: '36px',
            height: '36px',
            position: 'absolute',
            left: theme.spacing(0.5),
            minWidth: '36px',
        },
        nextPage: {
            width: '36px',
            height: '36px',
            position: 'absolute',
            right: theme.spacing(0.5),
            minWidth: '36px',
        },
    }),
)


const RelatedTheses: React.FC<RelatedThesesProps> = (props) => {
    const classes = useStyles()

    var { referenceThesis, page, indexedDiscussion, gotoPage } = props

    const related = useCallback(() => {
        return relatedTheses(referenceThesis, indexedDiscussion)
    }, [referenceThesis, indexedDiscussion])

    const theme = useTheme<Theme>()

    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))

    let visibleSolutions : number
    let pageStep : number

    if (isSmall) {
        visibleSolutions = 1
        pageStep = 1
    } else if (isMedium) {
        visibleSolutions = 3;
        pageStep = 1
    } else {
        visibleSolutions = 6;
        pageStep = 2
    }

    // four columns here: unrelated, supporting, supported, contradicting
    const pages = 4
//    const page_unrelated = 0
//    const page_supporting = 1
//    const page_supported = 2
//    const page_contradicting = 3

    if (pages < visibleSolutions) {
        page = 0
    } else if (page < 0) {
        page = 0
    } else if (page > pages - visibleSolutions) {
        page = pages - visibleSolutions
    }

    const prevPage = () => {
        if (page > 0) {
            gotoPage(Math.max(page - pageStep, 0))
        }
    }

    const nextPage = () => {
        if (page < pages - visibleSolutions) {
            gotoPage(Math.min(page + pageStep, pages - visibleSolutions))
        }
    }

    const fromSol = page
    const toSol = Math.min(fromSol + visibleSolutions, pages)

    let unrelatedColumn : JSX.Element[] = []
    let supportingColumn : JSX.Element[] = []
    let supportedColumn : JSX.Element[] = []
    let contradictingColumn : JSX.Element[] = []

    let { unrelatedTheses, supportedTheses, supportingTheses, contradictingTheses } = related()

    function buildColumn (theses: VotedThesis[], column: JSX.Element[], msg: string) {
        if (theses) {
            // TODO: sort

            column.concat(theses.map((votedThesis) =>
                <ThesisBox thesis={votedThesis}></ThesisBox>
            ))
        } else {
            column.push(
                <Typography>{i18n.t(msg)}</Typography>
            )
        }
    }

    buildColumn(Object.values(unrelatedTheses), unrelatedColumn, "no unrelated theses")
    buildColumn(supportedTheses.map((tr) => {
        return tr.to
    }), supportedColumn, "no supported theses")
    buildColumn(supportingTheses.map((tr) => {
        let tid = tr.relation.relation.thesis1

        return indexedDiscussion?.theses[tid]
    }).filter((vt) => !!vt) as VotedThesis[], supportingColumn, "no supporting theses")
    buildColumn(contradictingTheses.map((tr) => {
        let r = tr.relation.relation
        let tid = r.thesis1 === referenceThesis?.thesis.id ? r.thesis2 : r.thesis1

        return indexedDiscussion?.theses[tid]
    }).filter((vt) => !!vt) as VotedThesis[], contradictingColumn, "no contradicting theses")

    // layouts:
    // 1 "review new content" mode: unrelated
    // 2: "explore graph mode": supporting, s+c, contradicting
    // 3: support chain: supporting, supported

    /* RATIONALE
    (1) I want to review new content, just to see if new relations can be built
        workflow: select new thesis
                  switch to review new content
                  navigate through all thesis + search
        
     */

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} md={4} lg={2}>
                    { unrelatedColumn }
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                    { supportingColumn }
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                    { supportedColumn }
                </Grid>
                <Grid item xs={12} md={4} lg={2}>
                    { contradictingColumn }
                </Grid>
                { pages > visibleSolutions &&
                    <React.Fragment>
                        <Button aria-label="previous" className={classes.prevPage}
                            onClick={prevPage}>
                            <ChevronLeft/>
                        </Button>
                        <Button color="default" aria-label="next" className={classes.nextPage}
                            onClick={nextPage}>
                            <ChevronRight/>
                        </Button>
                    </React.Fragment>
                }
            </Grid>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedTheses)
