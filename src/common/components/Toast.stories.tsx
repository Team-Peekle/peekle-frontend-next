import type { Meta, StoryObj } from '@storybook/nextjs';

import Toast from './Toast.client';

const meta: Meta<typeof Toast> = {
  title: 'Common/Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '토스트에 표시될 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '기본 토스트 메시지',
  },
};
