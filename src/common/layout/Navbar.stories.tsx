import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./Navbar";
import { loginStore } from "@/common/store/loginStore";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
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

// Web 버전 - 로그인 상태
export const WebLoggedIn: Story = {
  render: () => {
    loginStore.getState().login();
    return (
      <div className="min-w-[800px]">
        <Navbar />
      </div>
    );
  },
};

// Web 버전 - 로그아웃 상태
export const WebLoggedOut: Story = {
  render: () => {
    loginStore.getState().logout();
    return (
      <div className="min-w-[800px]">
        <Navbar />
      </div>
    );
  },
};

// Mobile 버전 - 로그인 상태
export const MobileLoggedIn: Story = {
  render: () => {
    loginStore.getState().login();
    return (
      <div className="max-w-[799px]">
        <Navbar />
      </div>
    );
  },
};

// Mobile 버전 - 로그아웃 상태
export const MobileLoggedOut: Story = {
  render: () => {
    loginStore.getState().logout();
    return (
      <div className="max-w-[799px]">
        <Navbar />
      </div>
    );
  },
};

// Mobile 버전 - 메뉴 펼쳐진 상태 (로그인)
export const MobileMenuOpenLoggedIn: Story = {
  render: () => {
    loginStore.getState().login();
    return (
      <div className="max-w-[799px]">
        <Navbar />
        <div className="h-96 bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            스크롤 영역 (메뉴가 펼쳐진 상태)
          </p>
        </div>
      </div>
    );
  },
};

// Mobile 버전 - 메뉴 펼쳐진 상태 (로그아웃)
export const MobileMenuOpenLoggedOut: Story = {
  render: () => {
    loginStore.getState().logout();
    return (
      <div className="max-w-[799px]">
        <Navbar />
        <div className="h-96 bg-gray-100 p-4">
          <p className="text-sm text-gray-600">
            스크롤 영역 (메뉴가 펼쳐진 상태)
          </p>
        </div>
      </div>
    );
  },
};
