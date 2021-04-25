import React from 'react';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Base', module);

stories.add('About', () => (
  <article>
    <h1>Vibemap</h1>
    <p>Style-guide and component library</p>
    <p>Vibemap uses bit for sharable components. And style-dictionary for cross-platforms design tokens.</p>
    

    <p>To run this project on a local or remote server, like an Ubuntu instance.</p>
    <code>
      yarn install
      yarn storybook
    </code>

    <p>Ngnix config: The story book runs on port 6000. Configure the Ngnix like so.</p>
  </article>
));
