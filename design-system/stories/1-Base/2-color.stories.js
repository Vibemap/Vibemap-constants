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

stories.add('Color', () => {  

  const array = [1, 2, 3]
  const base_colors = variables['color']['base']  

  let color_keys = Object.keys(base_colors)

  let colors = color_keys.map(color => {
    const val = base_colors[color]    
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
      <h2>Color</h2>
      <p>The colors variables are defined in `design-system/properties/base.json`, and exported to `design-system/build` as JSON and Sass.</p>                 
      
      <h3>Base colors</h3>
      {colors}
    </article>
  )
});
