import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import { Story } from "@storybook/react";

import Badge, { BadgeProps } from "./badge";

import badges from 'vibemap-constants/dist/badges.json'

const badgeTypes = badges.badges.map(badge => badge.key)

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    badge: {
      control: {
        type: 'select',
        options: badgeTypes
      }
    }
  },
} as Meta;

// Create a master template for mapping args to render the Text component
const Template: Story = (args) => {

  const badgeInList = badges.badges.filter(item => item.key === args.badge )

  // First of each
  const [badgeInfo] = badgeInList

  if (badgeInfo) {
      args.vibe = badgeInfo['vibes'].length > 0 ? badgeInfo['vibes'].shift() : args.badge
      args.name = badgeInfo.name
      args.description = badgeInfo.description
  }

  return <Badge {...args} ></Badge>
}

// Reuse that template for creating different stories
export const CollectorBadge = Template.bind({});
CollectorBadge.args = {
    badge: 'collector',
    width: '300px',
    name: 'Title',
    subtitle: 'Badge Unlocked'
}
