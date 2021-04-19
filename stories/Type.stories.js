import React from 'react';

import { Heading } from '../components/Heading';
import { Button } from './Button';

export default {
  title: 'Example/Text',
  component: Heading
};

const Template = (args) => <Heading {...args} />;

export const h1 = Template.bind({});
h1.args = {
  size: 'h1',
  label: 'H1 - Level 1 Title',
}

export const Secondary = Template.bind({});
Secondary.args = {
    size: 'h2',
    label: 'h2 - Level 2 Heading',
}

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
}
