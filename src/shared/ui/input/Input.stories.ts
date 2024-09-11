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
    text: { control: 'text', description: '버튼 내부 텍스트입니다.' },
    rightNumber: { control: 'number', description: '오른쪽에 표시할 숫자입니다.' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: '텍스트',
  },
};
