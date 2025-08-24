import type { Meta, StoryObj } from '@storybook/nextjs';

import Chip from './Chip.server';

const meta: Meta<typeof Chip> = {
  title: 'Event/Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '칩 내부에 표시될 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CHIP_EXAMPLE: Story = {
  args: {
    text: 'D-12',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
