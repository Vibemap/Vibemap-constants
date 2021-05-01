import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Card, { Container } from "./card";

export default {
  title: "Components/Card",
  component: Container,
  argTypes: {}
}

// Create a master template for mapping args to render the Text component
const Template = (args) => <Card {...args} >{args.text}</Card>

// Reuse that template for creating different stories
export const Full = Template.bind({});
Full.args = {
  title: 'Card Title',
  description: 'Description goes here.',
  orientation: 'vertical',
  onClick: undefined,
}

const ContainerTemplate = (args) => <Container {...args} >{args.text}</Container>;

export const Basic = ContainerTemplate.bind({});
Basic.args = {
  height: '200px',
  width: '300px'
}