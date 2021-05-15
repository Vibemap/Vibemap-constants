import React from 'react';

import { storiesOf } from '@storybook/react';
const stories = storiesOf('Base', module);

import variables from '../../build/json/variables'
import styles from '../../styles/index.scss'

const Color = (label, color) => {
  const style = { margin: '1rem', minWidth: '20rem'}
  return (
    <div className='colors' style={{ display: 'flex'}}>
      <div style={style}>{label}</div>
      <div style={style}><pre>{color}</pre></div>
      <div style={{
        backgroundColor : color,
        margin: '1rem',
        width: '6rem',
        height: '6rem'
      }}/>
    </div>
  )
}

stories.add('Color Vibes', () => {

  const array = [1, 2, 3]
  const vibe_colors = variables['color']['vibes']

  let color_keys = Object.keys(vibe_colors)


  let colors = color_keys.map(color => {
    const val = vibe_colors[color]
    if (typeof val == 'string') {
      return Color(color, val)
    }

    if (typeof val === 'object') {
      return Object.keys(val).map(color2 => {
        return Color(color + ' ' + color2, val[color2])
      })
    }
  })

  return (
    <article className="sg-container">
      <h2>Vibe Colors</h2>
      <p>The colors for vibes are defined in `design-system/properties/base.json`, and exported to `design-system/build` as JSON and SASS.</p>

      <h3>Vibe colors</h3>
      {colors}
    </article>
  )
});
