import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import './../index.css';

import { Card, ICardProps } from './../components/Card';



export default {
  title: 'Notizen/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ICardProps> = (args) => <Card {...args} />;

export const Card01 = Template.bind({});
Card01.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
