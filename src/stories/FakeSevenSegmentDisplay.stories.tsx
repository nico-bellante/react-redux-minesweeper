import React from 'react'
import { number } from '@storybook/addon-knobs'

import FakeSevenSegmentDisplay from '../components/FakeSevenSegmentDisplay'

export default {
  title: 'Fake Seven Segment Display',
}

export const basic = () => (
  <FakeSevenSegmentDisplay value={number('value', 123)} />
)
