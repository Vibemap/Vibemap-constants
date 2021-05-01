import React from 'react';

import Card from '../components/card';

import variables from '../build/scss/_variables.scss'
import styles from '../components/card/singCard.scss'

export default {
  title: 'Example/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Single = Template.bind({});
Single.args = {
    primary: true,
};