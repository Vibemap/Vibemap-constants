import React from 'react';

import { storiesOf } from '@storybook/react';
const stories = storiesOf('Base', module);

import variables from '../../build/json/variables'

import styles from '../../styles/index.scss'

import { Card } from '../../components/card'

console.log('Card ', Card)

stories.add('Blocks', () => {    
  
  return (
    <article>
      <h2>Blocks</h2>
      <p>The mobile and web app and content are mostly composed of blocks.</p>
      <p>Many of which come from Wordpress posts and pages:</p>
      <ul>
          <li>Card Carousels, i.e. Sing Cards</li>
          <li>Photo Galleries</li>
          <li>Maps</li>
          <li>Rich Text</li>
          <li>Pull Quotes</li>
          <li>Share Buttons</li>
      </ul>

      For example here's a single card block.

      <section>
        <Card/>
      </section>    

    </article>
  )
});
