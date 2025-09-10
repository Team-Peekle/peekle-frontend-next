import type { Meta, StoryObj } from '@storybook/nextjs';

import Toast from './Toast.client';

const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    toast: {
      key: '기본 토스트입니다.',
      text: '기본 토스트입니다.',
      duration: 3000,
    },
  },
};

export const LongText: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    toast: {
      key: '이것은 내용이 아주 긴 토스트입니다. 화면에 어떻게 표시되는지 확인해 보세요.',
      text: '이것은 내용이 아주 긴 토스트입니다. 화면에 어떻게 표시되는지 확인해 보세요.',
      duration: 5000,
    },
  },
};

export const ShortDuration: Story = {
  render: (args) => <Toast {...args} />,
  args: {
    toast: {
      key: '금방 사라지는 토스트',
      text: '금방 사라지는 토스트',
      duration: 1000,
    },
  },
};
