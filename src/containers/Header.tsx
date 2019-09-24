import React from 'react'
import { css } from 'styled-components/macro'
import { connect } from 'react-redux'
import FakeSevenSegmentDisplay from '../components/FakeSevenSegmentDisplay'
import SmileyButton, { SmileStates } from '../components/SmileyButton'
import { GameState } from '../store/selectors'
import { selectors, actions } from '../store'
import { IState } from '../store/reducer'
import { COLORS } from '../theme'

const Header = (props: {
  timeElapsed: number
  gameState: GameState
  remainingFlags: number
  resetGame(): void
}) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      background: ${COLORS.cellBackgroundExposed};
      padding: 4px;
      border: 1px solid gray;
    `}
  >
    <FakeSevenSegmentDisplay
      value={props.timeElapsed}
    ></FakeSevenSegmentDisplay>
    <SmileyButton
      onClick={props.resetGame}
      state={
        {
          notStarted: 'smile',
          inProgress: 'smile',
          victory: 'sunglasses',
          defeat: 'dead',
        }[props.gameState] as SmileStates
      }
    ></SmileyButton>
    <FakeSevenSegmentDisplay
      value={props.remainingFlags}
    ></FakeSevenSegmentDisplay>
  </div>
)

export default connect(
  (state: IState) => ({
    timeElapsed: selectors.getTimeElapsed(state),
    gameState: selectors.getGameState(state),
    remainingFlags: selectors.getRemainingFlags(state),
  }),
  { resetGame: actions.reset },
)(Header)
