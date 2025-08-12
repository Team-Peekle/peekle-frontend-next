import type { Meta, StoryObj } from "@storybook/react";
import Profile from "./Profile";
import { ProfileVariant } from "./svg/Profile";

const meta: Meta<typeof Profile> = {
  title: "Common/Profile",
  component: Profile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        ProfileVariant.SIZE_32,
        ProfileVariant.SIZE_40,
        ProfileVariant.SIZE_64,
      ],
    },
    src: { control: "text" },
    alt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Size32: Story = {
  args: {
    variant: ProfileVariant.SIZE_32,
  },
};

export const Size40: Story = {
  args: {
    variant: ProfileVariant.SIZE_40,
  },
};

export const Size64: Story = {
  args: {
    variant: ProfileVariant.SIZE_64,
  },
};
