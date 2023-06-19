import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Chip, { ChipProps } from "./chip";


export default {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
//const Template = (args) => <Chip {...args} />;
const Template: Story<ChipProps> = (args) => <Chip {...args} />;


// Reuse that template for creating different stories
export const Primary = Template.bind({});
Primary.args = { text: "Chill", size: "large" };

export const Secondary = Template.bind({});
Secondary.args = { text: "Unexpected", size: "large" };

export const Dark = Template.bind({});
Dark.args = { text: "Dark", size: "large", backgroundColor: "black" };
