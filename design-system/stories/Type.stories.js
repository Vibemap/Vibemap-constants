import React from 'react';

import { Heading } from '../../components/heading/heading';
import { Button } from './Button';

export default {
  title: 'Example/Text',
  component: Heading
};

const Template = (args) => <Heading {...args} />;

export const heading1 = Template.bind({});

console.log('In type stories! ')

heading1.args = {
  size: 'h1',
  label: 'H1 - Level 1 Title',
}

export const heading2 = Template.bind({});
heading2.args = {
    size: 'h2',
    label: 'h2 - Level 2 Heading',
}

export const heading3 = Template.bind({});
heading3.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
}
