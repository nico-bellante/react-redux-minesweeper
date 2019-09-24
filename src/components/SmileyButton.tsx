import React, { useState } from 'react'
import { css } from 'styled-components/macro'
import { COLORS } from '../theme'

export type SmileStates = 'smile' | 'dead' | 'sunglasses'
const SmileyButton = (props: { state: SmileStates; onClick?(): void }) => {
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div
      onClick={props.onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      css={css`
        background: red;
        width: 40px;
        height: 40px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${COLORS.cellBackgroundExposed};
        border-top: 2px solid ${COLORS.borders.cell.bright};
        border-left: 2px solid ${COLORS.borders.cell.bright};
        border-bottom: 2px solid ${COLORS.borders.cell.dark};
        border-right: 2px solid ${COLORS.borders.cell.dark};

        &:hover {
          cursor: pointer;
        }
      `}
    >
      {isHovering
        ? '😳'
        : { smile: '😊', dead: '😖', sunglasses: '😎' }[props.state]}
    </div>
  )
}
export default SmileyButton
