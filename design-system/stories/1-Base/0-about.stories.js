import React from 'react';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Base', module);

stories.add('About', () => (
  <article className="sg-container">
    <h1>Vibemap</h1>
    <p>Style-guide and component library</p>
  </article>
));
