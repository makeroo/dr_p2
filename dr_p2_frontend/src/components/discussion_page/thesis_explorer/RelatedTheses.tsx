import React, { useMemo } from 'react'
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
import { VotedThesis, IndexedDiscussion } from '../../../store/discussion/types'
import ThesisBox from '../ThesisBox'
import i18n from '../../../i18n'
import { RouteChildrenProps, withRouter } from 'react-router'
import useUrlAndStateSyncer from '../../../utils/url_and_state_syncer_effect'


interface RelatedThesesRoutingParams {
    tid: string
}

const mapStateToProps = (state: AppState, props: RouteChildrenProps<RelatedThesesRoutingParams>) => {
    return {
        referenceThesisId: +props.match!.params.tid,
        indexedDiscussion: state.discussion.indexedDiscussion,
        referenceThesis: state.thesis_explorer.referenceThesis,
        page: state.thesis_explorer.page
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    gotoPage: (page: number) => {
        return dispatch(actions.theses_explorer.selectPage(page))
    },
    getThesis: (indexedDiscussion: IndexedDiscussion | undefined, thesisId: number) => {
        if (indexedDiscussion === undefined) {
            return
        }

        let t = indexedDiscussion.theses[thesisId]

        dispatch(actions.theses_explorer.setReferenceThesis(t))
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

    let { referenceThesisId, referenceThesis, page, indexedDiscussion, gotoPage, getThesis } = props

    useUrlAndStateSyncer(
        () => referenceThesis !== undefined && referenceThesis.thesis.id === referenceThesisId,
        () => getThesis(indexedDiscussion, referenceThesisId)
    )

    const related = useMemo(() => {
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
        visibleSolutions = 3
        pageStep = 1
    } else {
        visibleSolutions = 4
        pageStep = 2
    }

    // the four columns here: unrelated, supporting, supported, contradicting
    const pages = 4

    if (pages <= visibleSolutions) {
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


    let { unrelatedTheses, supportedTheses, supportingTheses, contradictingTheses } = related

    function buildColumn (theses: VotedThesis[], msg: string) : JSX.Element[] {
        if (theses) {
            // TODO: sort

            return [
                <Typography key={"h"}>{i18n.t(msg)}</Typography>
            ].concat(theses.map((votedThesis) =>
                <ThesisBox thesis={votedThesis} key={votedThesis.thesis.id}></ThesisBox>
            ))
        } else {
            return [
                <Typography>{i18n.t('none')}</Typography>
            ]
        }
    }

    let columns : JSX.Element[] = []

    if (fromSol <= 0 && toSol > 0) {
        let unrelatedColumn = buildColumn(Object.values(unrelatedTheses), "unrelated theses")

        columns.push(
            <Grid item xs={12} md={4} lg={3} key={1}>
                { unrelatedColumn }
            </Grid>
        )
    }

    if (fromSol <= 1 && toSol > 1) {
        let supportedColumn : JSX.Element[] = buildColumn(supportedTheses.map((tr) => {
            return tr.to
        }), "supported theses")

        columns.push(
            <Grid item xs={12} md={4} lg={3} key={2}>
                { supportedColumn }
            </Grid>
        )
    }

    if (fromSol <= 2 && toSol > 2) {
        let supportingColumn : JSX.Element[] = buildColumn(supportingTheses.map((tr) => {
            let tid = tr.relation.relation.thesis1

            return indexedDiscussion?.theses[tid]
        }).filter((vt) => !!vt) as VotedThesis[], "supporting theses")

        columns.push(
            <Grid item xs={12} md={4} lg={3} key={3}>
                { supportingColumn }
            </Grid>
        )
    }

    if (fromSol <= 3 && toSol > 3) {
        let contradictingColumn : JSX.Element[] = buildColumn(contradictingTheses.map((tr) => {
            let r = tr.relation.relation
            let tid = r.thesis1 === referenceThesis?.thesis.id ? r.thesis2 : r.thesis1

            return indexedDiscussion?.theses[tid]
        }).filter((vt) => !!vt) as VotedThesis[], "contradicting theses")

        columns.push(
            <Grid item xs={12} md={4} lg={3} key={4}>
                { contradictingColumn }
            </Grid>
        )
    }

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
                { columns }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RelatedTheses))
