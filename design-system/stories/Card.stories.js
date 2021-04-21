import React from 'react';

import { Card } from '../components/card/card';

export default {
  title: 'Example/Card',
  component: Card,  
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    primary: true,  
};

