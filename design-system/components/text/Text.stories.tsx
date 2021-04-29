import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Text, { TextProps } from "./text";

export default {
  title: "Components/Text",
  component: t,
  argTypes: {},
} as Meta;

// Create a master template for mapping args to render the Text component
const Template: Story<TextProps> = (args) => <Text {...args} />;

// Reuse that template for creating different stories
export const Normal = Template.bind({});
Normal.args = { label: "Primary 😃", size: "large" };

export const Small = Template.bind({});
Small.args = { ...Primary.args, primary: false, label: "Secondary 😇" };
