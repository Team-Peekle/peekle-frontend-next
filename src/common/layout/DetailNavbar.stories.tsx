import type { Meta, StoryObj } from "@storybook/react";
import DetailNavbar from "./DetailNavbar";

const meta: Meta<typeof DetailNavbar> = {
  title: "Layout/DetailNavbar",
  component: DetailNavbar,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
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

// 기본 상태 (뒤로가기만)
export const Default: Story = {
  render: () => <DetailNavbar />,
};

// 공유 버튼만
export const ShareOnly: Story = {
  render: () => (
    <DetailNavbar
      onShare={() => {
        alert("공유 기능 실행");
      }}
    />
  ),
};

// 스크랩 버튼만
export const ScrapOnly: Story = {
  render: () => (
    <DetailNavbar
      onScrap={() => {
        alert("스크랩 기능 실행");
      }}
    />
  ),
};

// 공유와 스크랩 모두
export const ShareAndScrap: Story = {
  render: () => (
    <DetailNavbar
      onShare={() => {
        alert("공유 기능 실행");
      }}
      onScrap={() => {
        alert("스크랩 기능 실행");
      }}
    />
  ),
};

// 스크롤 상태 확인용 (긴 콘텐츠 추가)
export const WithScroll: Story = {
  render: () => (
    <div>
      <DetailNavbar
        onShare={() => {
          alert("공유 기능 실행");
        }}
        onScrap={() => {
          alert("스크랩 기능 실행");
        }}
      />
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
