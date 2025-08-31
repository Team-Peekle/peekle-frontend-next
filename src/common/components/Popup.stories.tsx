import type { Meta, StoryObj } from '@storybook/nextjs';

import { PopupType } from '@common/types/popup';

import Popup from './Popup.server';

const meta: Meta<typeof Popup> = {
  title: 'Common/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: Object.values(PopupType),
    },
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
    type: PopupType.VAR1,
    title: '정말 삭제하시겠습니까?',
    leftText: '취소',
    rightText: '삭제',
  },
};
