import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import CardDescription, { DescriptionProps } from "./description";

export default {
  title: "Components/CardDescription",
  component: CardDescription,
  argTypes: {},
} as Meta;

// Create a master template for mapping args to render the Description component
const Template: Story<CardDescription> = (args) => <CardDescription {...args} />;

// Reuse that template for creating different stories
export const Description = Template.bind({});
Description.args = { label: "Primary", size: "normal" };
