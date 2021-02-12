import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import './../index.css';
import { Card, ICardProps } from './../components/Card';
import { Button, IButtonProps } from './../components/Button';

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

const Button01Tpl: Story<IButtonProps> = (args) => (
  <Button label="Mon bouton 01" clickHandler={() => {}} />
);
export const Button01 = Button01Tpl.bind({});
Button01.args = {
  label: 'Button',
};

const checkboxTemplate: Story<IButtonProps> = (args) => (
  <input
    type="checkbox"
    className="appearance-none checked:bg-blue-600 checked:border-transparent"
  />
);

export const checkbox = checkboxTemplate.bind({});
checkbox.args = {
  label: 'Button',
};

export const newButton = () => <Button label="My button 01" clickHandler={() => {}}></Button>
export const inputText = () => <input type="text" className="bg-gray-50 p-2 rounded-md" placeholder="Place holder"></input>
