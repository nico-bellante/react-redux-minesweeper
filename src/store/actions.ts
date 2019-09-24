import { createStandardAction, createAction } from 'typesafe-actions'
import { Coordinates } from '../minesweeper'

export const initialize = createStandardAction('INITIALIZE')<{
  width: number
  height: number
  numberOfMines: number
}>()

export const sweep = createStandardAction('SWEEP')<
  Coordinates & { timestamp: number }
>()
export const flag = createStandardAction('FLAG')<Coordinates>()

export const reset = createAction('RESET')

export const incrementTimer = createAction('INCREMENT_TIMER')
