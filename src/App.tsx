import React from 'react'
import { css } from 'styled-components/macro'
import { GridCellStates } from './components/GridCell'
import { Coordinates } from './minesweeper'
import { COLORS } from './theme'
import { GameState } from './store/selectors'
import Header from './containers/Header'
import Grid from './containers/Grid'

const App: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: ${COLORS.appBackground};
      `}
    >
      <div
        css={css`
          max-width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          background: ${COLORS.cellBackgroundHidden};
        `}
      >
        <Header />
        <Grid />
      </div>
    </div>
  )
}

export default App
