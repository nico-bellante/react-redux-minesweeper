import React from 'react'
import { css } from 'styled-components/macro'
import { COLORS } from '../theme'

const FakeSevenSegmentDisplay = (props: { value: number }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${COLORS.sevenSegment.background};
      color: ${COLORS.sevenSegment.color};
      width: 84px;
      height: 36px;
      font-size: 48px;
      letter-spacing: -3px;
      font-family: 'Courier New', Courier, monospace;
      font-weight: 700;
      line-height: 40px;
      padding-top: 6px;
      border-right: 1px solid ${COLORS.borders.cell.bright};
      border-bottom: 1px solid ${COLORS.borders.cell.bright};
      border-top: 1px solid ${COLORS.borders.cell.dark};
      border-left: 1px solid ${COLORS.borders.cell.dark};
    `}
  >
    {Math.min(props.value, 999)
      .toString()
      .padStart(3, '0')}
  </div>
)

export default FakeSevenSegmentDisplay
