import type { Meta, StoryObj } from '@storybook/nextjs';

import Popup from './Popup.server';

const meta: Meta<typeof Popup> = {
  title: 'Common/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    leftText: { control: 'text' },
    rightText: { control: 'text' },
    onLeft: { action: 'left clicked' },
    onRight: { action: 'right clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '정말 삭제하시겠습니까?',
    leftText: '취소',
    rightText: '삭제',
  },
};
