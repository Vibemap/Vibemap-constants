import React from 'react';

import { storiesOf } from '@storybook/react';
const stories = storiesOf('Base', module);

import variables from '../../build/json/variables'

//import styles from '../../styles/index.scss'

stories.add('Photography', () => {

  return (
    <article>
        <h2>Photography</h2>

        <iframe
            src="https://docs.google.com/presentation/d/1UOyK0Nz-giHKfabrUkHTtnsHq4tVI2DlWlgTLFi3sNI/embed"
            //style="border:0px #ffffff none;"
            name="Vibemap Photography"
            scrolling="no"
            frameBorder="1"
            marginHeight="0px"
            marginWidth="0px"
            height="400px"
            width="600px"
            allowFullScreen>

        </iframe>

    </article>
  )
});
