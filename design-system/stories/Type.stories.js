import React from 'react';

import Heading from '../components/heading';
import Text from '../components/text';
import Button from './Button';

export default {
  title: 'Example/Text',
  component: Heading
};

const Template = (args) => <Heading {...args} />;

const TextTemplate = (args) => <Text {...args}>Text</Text>;

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
  label: 'h3 - Level 3 Headign',
}

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
}

export const Normal = TextTemplate.bind({});
