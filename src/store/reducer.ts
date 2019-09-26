import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import { get2DArrayOf } from '../utils'
import { cloneDeep, every } from 'lodash'
import { generateMap, getSurroundingPoints } from '../minesweeper'
import { number } from '@storybook/addon-knobs'

type AllActions = ActionType<typeof actions>

export type CellState =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | 'mine'

export interface IState {
  boardWidth: number
  boardHeight: number
  numberOfMines: number
  timeElapsed: number
  board: CellState[][] | undefined
  visibility: boolean[][] | undefined
  flags: boolean[][] | undefined
  explodedMines: boolean
  inProgress: boolean
}

export default (
  state: IState = {
    boardWidth: 10,
    boardHeight: 10,
    numberOfMines: 10,
    timeElapsed: 0,
    board: undefined,
    visibility: undefined,
    flags: undefined,
    explodedMines: false,
    inProgress: false,
  },
  action: AllActions,
): IState => {
  switch (action.type) {
    case getType(actions.initialize):
      return {
        board: generateMap(
          action.payload.width,
          action.payload.height,
          action.payload.numberOfMines,
        ),
        boardWidth: action.payload.width,
        boardHeight: action.payload.height,
        visibility: get2DArrayOf(
          false,
          action.payload.width,
          action.payload.height,
        ),
        flags: get2DArrayOf(false, action.payload.width, action.payload.height),
        explodedMines: false,
        timeElapsed: 0,
        numberOfMines: action.payload.numberOfMines,
        inProgress: false,
      }

    case getType(actions.sweep):
      const newVisibility = cloneDeep(state.visibility!)
      const height = newVisibility.length
      const width = newVisibility[0].length
      const { timestamp, ...coords } = action.payload
      let sweepIndicies = [coords]
      let explodedMines = state.explodedMines
      while (sweepIndicies.length > 0) {
        const { x, y } = sweepIndicies.shift()!

        const value = state.board![y][x]
        if (value === 'mine') {
          explodedMines = true
        } else if (value === '0' && !newVisibility[y][x]) {
          const surroundingPoints = getSurroundingPoints(
            { x, y },
            width,
            height,
          )
          sweepIndicies = [...sweepIndicies, ...surroundingPoints]
        }
        newVisibility[y][x] = true
      }

      return {
        ...state,
        visibility: newVisibility,
        explodedMines,
        inProgress: true,
      }

    case getType(actions.flag):
      const newFlags = cloneDeep(state.flags!)
      const { x, y } = action.payload
      newFlags[y][x] = !newFlags[y][x]
      return {
        ...state,
        flags: newFlags,
        inProgress: true,
      }

    case getType(actions.reset):
      return {
        ...state,
        board: generateMap(
          state.boardWidth,
          state.boardHeight,
          state.numberOfMines,
        ),

        visibility: get2DArrayOf(false, state.boardWidth, state.boardHeight),
        flags: get2DArrayOf(false, state.boardWidth, state.boardHeight),
        explodedMines: false,
        timeElapsed: 0,
        inProgress: false,
      }

    case getType(actions.incrementTimer):
      if (
        state.inProgress &&
        !state.explodedMines &&
        state.visibility &&
        !every(
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
      ) {
        return { ...state, timeElapsed: state.timeElapsed + 1 }
      } else {
        return state
      }

    default:
      return state
  }
}
