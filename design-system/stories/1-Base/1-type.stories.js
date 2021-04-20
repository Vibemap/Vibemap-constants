import React from 'react';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Base', module);

import styles from '../../styles/index.scss'

stories.add('Typography', () => (
  <article className="sg-container">
    <p className="sg-heading">Typography</p>

    <div top={8} bottom={5}>
      <div className="sg-flex-row">
        <h1>h1 Headline</h1>
        <code>{`<h1/>`}, .h1</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <h2>h2 Headline</h2>
        <code>{`<h2/>`}, .h2</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <h3>h3 Headline</h3>
        <code>{`<h3/>`}, .h3</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <h4>h4 Headline</h4>
        <code>{`<h4/>`}, .h4</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <strong>Subheading</strong>
        <code>{`<strong/>`}</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <p>Body copy</p>
        <code>{`<p/>`}</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <p className="link">Link</p>
        <code>{`<a/>, .link`}</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <small>Body copy 2</small>
        <code>{`<small/>`}</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <p className="caption">Caption</p>
        <code>.caption</code>
      </div>
    </div>
    <hr />
    <div top={5} bottom={5}>
      <div className="sg-flex-row">
        <p className="overline">Overline</p>
        <code>.overline</code>
      </div>
    </div>
  </article>
));
