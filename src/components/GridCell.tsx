import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../theme'

export type GridCellStates =
  | 'hidden'
  | 'flagged'
  | 'mine'
  | 'explodedMine'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'

export type Props = {
  state: GridCellStates
  sweepCell?(): void
  toggleFlagForCell?(): void
}

const GridCell = (props: Props) => {
  const Cell = (cellProps: { children?: React.ReactNode }) => {
    const isHidden = ['hidden', 'flagged'].includes(props.state)
    return (
      <CellWrapper
        onClick={props.sweepCell}
        onContextMenu={event => {
          event.preventDefault()
          if (isHidden && props.toggleFlagForCell) {
            props.toggleFlagForCell()
          }
        }}
        background={
          props.state === 'explodedMine'
            ? COLORS.explodedMineBackground
            : isHidden
            ? COLORS.cellBackgroundHidden
            : COLORS.cellBackgroundExposed
        }
        topAndLeftBorderColor={
          isHidden ? COLORS.borders.cell.bright : COLORS.borders.cell.medium
        }
        bottomAndRightBorderColor={
          isHidden ? COLORS.borders.cell.dark : COLORS.borders.cell.medium
        }
        style={getStyles(props)}
      >
        {cellProps.children}
      </CellWrapper>
    )
  }

  if (props.state === 'hidden' || props.state === '0') {
    return (
      <Cell>
        {props.state !== '0' && props.sweepCell && <HoverTint></HoverTint>}
      </Cell>
    )
  } else if (props.state === 'flagged') {
    return <Cell>⚑</Cell>
  } else if (props.state === 'mine' || props.state === 'explodedMine') {
    return <Cell>💣</Cell>
  } else {
    // for all the numbers
    return <Cell>{props.state}</Cell>
  }
}

export default GridCell

type CellWrapperProps = {
  background: string
  topAndLeftBorderColor: string
  bottomAndRightBorderColor: string
}
const CellWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  border-top: 0.05px solid
    ${(props: CellWrapperProps) => props.topAndLeftBorderColor};
  border-left: 0.05px solid
    ${(props: CellWrapperProps) => props.topAndLeftBorderColor};
  border-bottom: 0.05px solid
    ${(props: CellWrapperProps) => props.bottomAndRightBorderColor};
  border-right: 0.05px solid
    ${(props: CellWrapperProps) => props.bottomAndRightBorderColor};

  width: 100%;
  height: 100%;

  font-family: 'Courier New', Courier, monospace;
  font-weight: 1000;

  background: ${(props: CellWrapperProps) => props.background};
`

const HoverTint = styled.span`
  width: 100%;
  height: 100%;

  &:hover {
    background: ${COLORS.hoverTint};
    cursor: pointer;
  }
`

const getStyles = (props: Props) => ({
  color: ((n: string) => {
    switch (n) {
      case '1':
        return COLORS.oneBlue
      case '2':
        return COLORS.twoGreen
      case '3':
        return COLORS.threeOrange
      case '4':
        return COLORS.fourViolet
      case '5':
        return COLORS.fiveRed
      case '6':
        return COLORS.sixTeal
      case '7':
        return COLORS.sevenYellow
      case '8':
        return COLORS.eightMagenta
      case 'flagged':
        return COLORS.flagRed
      default:
        return 'black'
    }
  })(props.state),
  fontSize: `${
    props.state === 'mine' || props.state === 'explodedMine' ? '70%' : '90%'
  }`,
})
