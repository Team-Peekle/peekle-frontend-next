import type { Meta, StoryObj } from '@storybook/nextjs';

import DeferredLoader from './DeferredLoader.client';

const meta: Meta<typeof DeferredLoader> = {
  title: 'Common/DeferredLoader',
  component: DeferredLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
