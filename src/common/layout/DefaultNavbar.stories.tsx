import type { Meta, StoryObj } from "@storybook/react";
import DefaultNavbar from "./DefaultNavbar";

const meta: Meta<typeof DefaultNavbar> = {
  title: "Layout/DefaultNavbar",
  component: DefaultNavbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1200px] mx-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태
export const Default: Story = {
  render: () => <DefaultNavbar />,
};

// 스크롤 상태 확인용 (긴 콘텐츠 추가)
export const WithScroll: Story = {
  render: () => (
    <div>
      <DefaultNavbar />
      <div className="h-screen bg-gray-100 p-4">
        <p className="text-sm text-gray-600">
          스크롤 영역 (스크롤하면 하단에 선이 나타남)
        </p>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="h-8 bg-white rounded p-2">
              콘텐츠 {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
