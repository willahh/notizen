import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Card, CardProps } from './Card';
import { Button, IButtonProps } from './../components/Button';

export default {
  title: 'Notizen/Card',
  component: Card,
} as Meta;

const Template: Story<IButtonProps> = (args) => <Button {...args} />;

export const CardIn = Template.bind({});
CardIn.args = {
  user: {},
};
