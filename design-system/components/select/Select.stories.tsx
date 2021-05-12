import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";
import Select, { SelectProps } from "./select";

import styled from 'styled-components';

const ThemedDiv = styled.div`
  padding: 3rem;
  background: ${({ theme }) => theme.backgroundColor}
`

//console.log('Theme in story? ', props)

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    onClick: { action : 'changed' },
    backgroundColor: { control: 'color' },
  },
} as Meta;

// Create a master template for mapping args to render the Button component
const Template: Story<SelectProps> = (args) => <Select {...args} />;

// Reuse that template for creating different stories
export const Large = Template.bind({});

// Exampleo of a decorator that provide styles
Large.decorators = [(Story) => <ThemedDiv>
  <Story/>
</ThemedDiv>]

Large.args = {
  className: 'cityFilter',
  label: "Large Select",
  onChange: (e) => console.log('changed value: ', e),
  options: [
    { key: 1,  value: 1, label: 'Option 1'},
    { key: 2,  value: 2, label: 'Option 2'}
  ],
  size: "large" };
