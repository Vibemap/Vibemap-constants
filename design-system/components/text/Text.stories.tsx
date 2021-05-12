import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Text, { Sizes, Weights, TextProps } from "./text";

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: Object.values(Sizes)
      }
    },
    weight: {
      control: {
        type: 'radio',
        options: Object.values(Weights)
      }
    }
  },
} as Meta;

// Create a master template for mapping args to render the Text component
const Template: Story<TextProps> = (args) => <Text {...args} >{args.text}</Text>;

// Reuse that template for creating different stories
export const Normal = Template.bind({});
Normal.args = {
  size: Sizes.large,
  weight: Sizes.normal,
  text: "Example"
}