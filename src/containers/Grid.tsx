import React from 'react'
import { connect } from 'react-redux'
import { selectors, actions } from '../store'
import { IState } from '../store/reducer'
import Grid from '../components/Grid'

export default connect(
  (state: IState) => ({
    disabled: selectors.getIsGridDisabled(state),
    remainingFlags: selectors.getRemainingFlags(state),
    size: {
      ...selectors.getBoardDimensions(state),
      cellPx: 24,
    },
    state: selectors.getGridState(state),
  }),
  { onCellSweep: actions.sweep, onCellFlag: actions.flag },
)(Grid)
