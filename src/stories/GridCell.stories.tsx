import React from 'react'
import GridCell, { Props as GridCellProps } from '../components/GridCell'

export default {
  title: 'Grid Cell',
}

const WrappedCell = (props: Partial<GridCellProps>) => (
  <div style={{ width: '24px', height: '24px', fontSize: '18px' }}>
    <GridCell
      toggleFlagForCell={() => {}}
      sweepCell={() => {}}
      state="hidden"
      {...props}
    ></GridCell>
  </div>
)

export const hidden = () => <WrappedCell state={'hidden'} />
export const mine = () => <WrappedCell state={'mine'} />
export const flagged = () => <WrappedCell state={'flagged'} />

export const zero = () => <WrappedCell state={'0'} />
export const one = () => <WrappedCell state={'1'} />
export const two = () => <WrappedCell state={'2'} />
export const three = () => <WrappedCell state={'3'} />
export const four = () => <WrappedCell state={'4'} />
export const five = () => <WrappedCell state={'5'} />
export const six = () => <WrappedCell state={'6'} />
export const seven = () => <WrappedCell state={'7'} />
export const eight = () => <WrappedCell state={'8'} />

export const all = () =>
  [
    hidden,
    mine,
    flagged,
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
  ].map(func => func())
