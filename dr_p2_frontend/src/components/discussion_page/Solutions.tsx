import React from 'react'
import { useRef } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import CircularProgress from '@material-ui/core/CircularProgress'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import i18n from 'i18next'

import { AppState } from '../../store/index'
import { solutionsSelectPage, addSolutionDialog, addThesisDialog, closeAddDialog, pinThesis } from '../../store/discussion_explorer/actions'
import { AddDialogType } from '../../store/discussion_explorer/types'
import SolutionBox from './SolutionBox'
import ThesisBox from './ThesisBox'
import { RelationType, VotedThesis } from '../../store/discussion/types';
import actions from '../../context'

const mapStateToProps = (state: AppState) => ({
    //theses: state.discussion.discussion!.theses.filter((thesis) => (!thesis.solution))
    //discussion: state.discussion.discussion!,
    indexedDiscussion: state.discussion.indexedDiscussion!,
    page: state.discussion_explorer.page,
    addDialogType: state.discussion_explorer.addDialogType,
    working: state.discussion.loading,
    pinnedThesis: state.discussion_explorer.pinnedThesis,
    tappedThesis: state.discussion_explorer.tappedThesis,
    canAddSupport: state.discussion_explorer.canAddSupport,
    canAddContradiction: state.discussion_explorer.canAddContradiction
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    openAddSolutionDialog: () => {
        return dispatch(addSolutionDialog())
    },
    openAddThesisDialog: () => {
        return dispatch(addThesisDialog())
    },
    closeAddDialog: () => {
        return dispatch(closeAddDialog())
    },
    postThesis: (is_solution: boolean, content: string) => {
        return dispatch(actions.discussion.postThesis(is_solution, content))
    },
    gotoPage: (page: number) => {
        return dispatch(solutionsSelectPage(page))
    },
    addRelation: async (thesis1: VotedThesis, thesis2: VotedThesis, type: RelationType) => {
        return dispatch(actions.discussion.postRelation(thesis1.thesis, thesis2.thesis, type))
    },
    unpinThesis: () => {
        dispatch(pinThesis(null))
    }
})

type SolutionsProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

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

const Solutions : React.FC<SolutionsProps> = (props) => {
    const classes = useStyles();

    const { indexedDiscussion, openAddSolutionDialog, openAddThesisDialog, closeAddDialog, addDialogType, postThesis, gotoPage, working, addRelation, pinnedThesis, tappedThesis, unpinThesis, canAddSupport, canAddContradiction } = props
    var { page } = props
    const { solutions, theses, invertedSupports, unbindedTheses } = indexedDiscussion

    const theme = useTheme<Theme>()
    let visibleSolutions : number

    const inputEl = useRef<HTMLInputElement>(null)

    const submitThesis = () => {
        closeAddDialog()

        if (inputEl && inputEl.current) {
            const thesis = inputEl.current.value

            postThesis(addDialogType === AddDialogType.Solution, thesis)
            //console.log('new solution', thesis)
        }
    }

    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
    const isMedium = useMediaQuery(theme.breakpoints.down('md'))
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

    const pageShift = unbindedTheses ? 1 : 0
    const pages = solutions.length + pageShift

    if (pages < visibleSolutions) {
        page = 0;
    } else if (page < 0) {
        page = 0;
    } else if (page > pages - visibleSolutions) {
        page = pages - visibleSolutions;
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

    const handleSupportToSolutionConfirm = () => {
        if (pinnedThesis && tappedThesis) {
            closeAddDialog()

            addRelation(pinnedThesis, tappedThesis, RelationType.support).then(() => {
                unpinThesis()
            })
        } else {
            console.error('clicked confirm in support solution dialog without either pinned thesis or selected solution')
        }
    }

    const handleSupportBetweenThesesConfirm = () => {
        if (pinnedThesis && tappedThesis && canAddSupport) {
            closeAddDialog()

            addRelation(pinnedThesis, tappedThesis, RelationType.support).then(() => {
                unpinThesis()
            })
        }
    }

    const handleContradictionBetweenThesesConfirm = () => {
        if (pinnedThesis && tappedThesis && canAddContradiction) {
            closeAddDialog()

            addRelation(pinnedThesis, tappedThesis, RelationType.support).then(() => {
                unpinThesis()
            })
        }
    }

    const fromSol = Math.max(0, page - pageShift)
    const toSol = Math.min(fromSol + visibleSolutions - (page === 0 ? pageShift : 0), solutions.length)

    let solutionColumns : JSX.Element[] = []
    let thesesColumns : JSX.Element[] = []

    if (unbindedTheses && page === 0) {
        const thesesElements : JSX.Element[] = []

        for (let thesis of Object.values(unbindedTheses)) {
            thesesElements.push(
                <Grid item xs={12} key={thesis.thesis.id}>
                    <ThesisBox thesis={thesis}/>
                </Grid>
            )
        }

        solutionColumns.push(
            <Grid item xs={12} md={4} lg={2} key={'unbinded'}>
                <Typography>{i18n.t('unbinded theses')}</Typography>
            </Grid>
        )
        thesesColumns.push(
            <Grid item container xs={12} md={4} lg={2} key={'unbinded'}>
                { thesesElements }
            </Grid>
        )
    }

    for (let i = fromSol; i < toSol; ++i) {
        //console.log(fromSol, toSol,i)
        const solution = solutions[i];

        const thesesElements : JSX.Element[] = []
        const supports = invertedSupports[solution.thesis.id]

        if (supports) {
            for (let votedRelation of invertedSupports[solution.thesis.id]) {
                const thesis = theses[votedRelation.to.thesis.id]
    
                thesesElements.push(
                    <Grid item xs={12} key={thesis.thesis.id}>
                        <ThesisBox thesis={thesis}/>
                    </Grid>
                )
            }
        }

        solutionColumns.push(
            <Grid item xs={12} md={4} lg={2} key={solution.thesis.id}>
                <SolutionBox thesis={solution}/>
            </Grid>
        )
        thesesColumns.push(
            <Grid item container xs={12} md={4} lg={2} key={solution.thesis.id}>
                { thesesElements }
            </Grid>
        )
    }

    if (solutionColumns.length === 0) {
        solutionColumns.push(
            <Grid item xs={12} key={'-'}>
                <Typography>{i18n.t('no solutions yet')}</Typography>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid container>
                { solutionColumns }
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
            <Grid container>
                { thesesColumns }
            </Grid>
            { working ?
            <CircularProgress className={classes.fab}/>
            :
            <Fab color="primary" aria-label="add" className={classes.fab}
                onClick={openAddSolutionDialog}>
                <AddIcon/>
            </Fab>
            }
            <Dialog open={addDialogType === AddDialogType.Solution || addDialogType === AddDialogType.Thesis} onClose={closeAddDialog} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    {i18n.t(addDialogType === AddDialogType.Solution ? 'add solution' : 'add thesis')}
                    <Button onClick={addDialogType === AddDialogType.Solution ? openAddThesisDialog : openAddSolutionDialog}>{i18n.t(addDialogType === AddDialogType.Solution ? 'A thesis' : 'A solution')}</Button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {i18n.t(addDialogType === AddDialogType.Solution ? 'how to write a solution' : 'how to write a thesis')}
                    </DialogContentText>
                    <TextField
                        inputRef={inputEl}
                        autoFocus
                        placeholder={i18n.t(addDialogType === AddDialogType.Solution ? 'solution placeholder' : 'thesis placeholder')}
                        required
                        multiline
                        rowsMax={8}
                        id="solution"
                        inputProps={{
                            maxLength:255
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDialog} color="primary">
                        {i18n.t('Cancel')}
                    </Button>
                    <Button onClick={submitThesis} color="primary">
                        {i18n.t('Submit')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={addDialogType === AddDialogType.SupportToSolution} onClose={closeAddDialog} area-labelledby="form-dialog-title">
                <DialogTitle>{i18n.t('support')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{i18n.t('add pinned thesis to solution')}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDialog} color="primary">
                        {i18n.t('Cancel')}
                    </Button>
                    <Button onClick={handleSupportToSolutionConfirm} color="primary">
                        {i18n.t('Add')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={addDialogType === AddDialogType.RelationBetweenTheses} onClose={closeAddDialog} area-labelledby="form-dialog-title">
                <DialogTitle>{i18n.t(
                    canAddSupport && canAddContradiction ? 'support or contradiction' :
                    canAddSupport                        ? 'support'                  :
                                                           'contradiction'
                    )}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{i18n.t(
                        canAddSupport && canAddContradiction ? 'add support or contradiction between theses' :
                        canAddSupport                        ? 'add support'                                 :
                                                               'add contradiction'
                    )}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddDialog} color="primary">
                        {i18n.t('Cancel')}
                    </Button>
                    { canAddSupport &&
                        <Button onClick={handleSupportBetweenThesesConfirm} color="primary">
                            {i18n.t('Support')}
                        </Button>
                    }
                    { canAddContradiction &&
                        <Button onClick={handleContradictionBetweenThesesConfirm} color="primary">
                            {i18n.t('Contradiction')}
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Solutions)
