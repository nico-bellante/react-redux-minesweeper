import React from 'react'
import styled, { css } from 'styled-components/macro'
import GridCell, { GridCellStates } from './GridCell'
import { Coordinates } from '../minesweeper'
import { isEqual } from 'lodash'

type Props = {
  disabled: boolean
  remainingFlags: number
  size: {
    width: number
    height: number
    cellPx: number
  }
  state: GridCellStates[][]
  onCellSweep(coords: Coordinates & { timestamp: number }): void
  onCellFlag(coords: Coordinates): void
}

const Grid = React.memo(
  (props: Props) => {
    const actualHeightPx = props.size.cellPx * props.size.height + 2 // + 2 for the border
    const actualWidthPx = props.size.cellPx * props.size.width + 2 // + 2 for the border
    const X = Array.from(Array(props.size.width))
    const Y = Array.from(Array(props.size.height))
    return (
      <div
        css={css`
          border: 1px solid gray;
          width: ${actualWidthPx}px;
          height: ${actualHeightPx}px;
          font-size: ${0.75 * props.size.cellPx}px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        `}
      >
        {Y.map((_, y) => (
          <div
            key={`row-key-${y}`}
            css={css`
              display: flex;
              height: ${props.size.cellPx}px;
            `}
          >
            {X.map((_, x) => {
              const cellState = props.state[y][x]
              const clickHandlers = props.disabled
                ? {}
                : {
                    toggleFlagForCell:
                      props.remainingFlags > 0 || cellState === 'flagged'
                        ? () => props.onCellFlag({ x, y })
                        : undefined,
                    sweepCell:
                      cellState === 'flagged'
                        ? undefined
                        : () =>
                            props.onCellSweep({ x, y, timestamp: Date.now() }),
                  }
              return (
                <GridCell
                  {...clickHandlers}
                  key={`cell-key-${y}-${x}`}
                  state={cellState}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
)

export default Grid
