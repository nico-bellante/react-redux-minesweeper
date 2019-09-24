import React from 'react'

import SmileyButton from '../components/SmileyButton'

export default {
  title: 'Smiley Button',
}

export const smile = () => <SmileyButton state={'smile'} />
export const dead = () => <SmileyButton state={'dead'} />
export const sunglasses = () => <SmileyButton state={'sunglasses'} />
