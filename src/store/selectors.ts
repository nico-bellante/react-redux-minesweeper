import { IState } from './reducer'
import { GridCellStates } from '../components/GridCell'
import { every } from 'lodash'

export const getGridState = (state: IState): GridCellStates[][] => {
  if (!state.visibility || !state.board || !state.flags) {
    throw new Error('This should not be called before initialization')
  }
  let gridState = state.visibility.map((row, y) =>
    row.map((cellVisibility, x) => {
      if (
        cellVisibility ||
        (state.explodedMines && state.board![y][x] === 'mine')
      ) {
        if (cellVisibility && state.board![y][x] === 'mine') {
          return 'explodedMine'
        } else {
          return state.board![y][x]
        }
      } else if (state.flags![y][x]) {
        return 'flagged'
      } else {
        return 'hidden'
      }
    }),
  )
  return gridState
}

export type GameState = 'notStarted' | 'inProgress' | 'victory' | 'defeat'
export const getGameState = (state: IState): GameState => {
  if (
    !state.visibility ||
    !state.board ||
    !state.flags ||
    every(state.visibility.map(row => every(row.map(value => !value))))
  ) {
    return 'notStarted'
  }

  if (state.explodedMines) {
    return 'defeat'
  }

  const isVictory = every(
    state.visibility.map((row, y) =>
      every(
        row.map(
          (isVisible, x) =>
            (isVisible && state.board![y][x] !== 'mine') ||
            (!isVisible && state.board![y][x] === 'mine'),
        ),
      ),
    ),
  )

  if (isVictory) {
    return 'victory'
  } else {
    return 'inProgress'
  }
}

export const getTimeElapsed = (state: IState): number => {
  return state.timeElapsed
}

export const getRemainingFlags = (state: IState): number => {
  if (state.numberOfMines === undefined) {
    return 0
  }

  let flagCount = 0
  if (state.flags) {
    state.flags.forEach((row, y) =>
      row.forEach((value, x) => {
        if (value && !state.visibility![y][x]) {
          flagCount++
        }
      }),
    )
  }

  return state.numberOfMines - flagCount
}

export const getIsGridDisabled = (state: IState): boolean => {
  const gameState = getGameState(state)
  return !['inProgress', 'notStarted'].includes(gameState)
}

export const getBoardDimensions = (
  state: IState,
): { width: number; height: number } => ({
  width: state.boardWidth,
  height: state.boardHeight,
})
