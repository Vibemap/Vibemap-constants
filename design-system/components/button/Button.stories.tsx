import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Button, { ButtonProps } from "./button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { label: "Primary 😃", size: "large" };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, primary: false, label: "Secondary 😇" };
