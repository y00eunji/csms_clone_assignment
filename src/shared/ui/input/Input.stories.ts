import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Input from './Input.tsx';

const meta = {
  title: 'Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'ID',
    value: 'text',
  },
};
