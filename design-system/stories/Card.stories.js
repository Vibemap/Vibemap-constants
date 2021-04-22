import React from 'react';

import { Card } from '../components/card/card';

import variables from '../build/scss/_variables.scss'
import styles from '../components/card/singCard.scss'

export default {
  title: 'Example/Card',
  component: Card,  
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,  
};