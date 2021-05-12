import React from 'react';

import Chip from '../components/chip';

export default {
  title: 'Example/Chip',
  component: Chip,
};

const Template = (args) => <Chip {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,
};