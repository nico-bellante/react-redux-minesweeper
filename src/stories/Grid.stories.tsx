import React from 'react'
import { number } from '@storybook/addon-knobs'

import Grid from '../components/Grid'
import { generateMap, Coordinates } from '../minesweeper'
import { get2DArrayOf } from '../utils'

export default {
  title: 'Grid',
}

const onCellSweep = (_: Coordinates) => {}
const onCellFlag = (_: Coordinates) => {}

const commonProps = {
  onCellSweep,
  onCellFlag,
  disabled: false,
  remainingFlags: 10,
}

export const interactive = () => (
  <Grid
    {...commonProps}
    size={{
      width: number('width (in cells)', 10),
      height: number('height (in cells)', 10),
      cellPx: number('cell pixel size', 30),
    }}
    state={get2DArrayOf('hidden', 100, 100)}
  />
)

export const xsmall = () => (
  <Grid
    {...commonProps}
    size={{ width: 5, height: 5, cellPx: 36 }}
    state={get2DArrayOf('hidden', 5, 5)}
  />
)

export const small = () => (
  <Grid
    {...commonProps}
    size={{ width: 10, height: 10, cellPx: 24 }}
    state={generateMap(10, 10, 20)}
  />
)

export const medium = () => (
  <Grid
    {...commonProps}
    size={{ width: 20, height: 20, cellPx: 18 }}
    state={generateMap(20, 20, 99)}
  />
)

export const large = () => (
  <Grid
    {...commonProps}
    size={{ width: 50, height: 30, cellPx: 14 }}
    state={generateMap(50, 30, 250)}
  />
)

export const xlarge = () => (
  <Grid
    {...commonProps}
    size={{ width: 100, height: 40, cellPx: 12 }}
    state={generateMap(100, 40, 99)}
  />
)

export const disabled = () => (
  <Grid
    {...commonProps}
    disabled={true}
    size={{ width: 20, height: 20, cellPx: 18 }}
    state={generateMap(20, 20, 99)}
  />
)
