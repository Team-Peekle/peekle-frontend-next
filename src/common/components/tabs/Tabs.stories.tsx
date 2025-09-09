import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import Tabs from './Tabs.client';
import List from './components/List.client';
import Panel from './components/Panel.client';
import Trigger from './components/Trigger.client';

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    option: {
      control: 'text',
      description: '접근성을 위한 탭 종류 문자열 (e.g., 이벤트 필터 탭)',
    },
    defaultValue: {
      control: 'text',
      description: '초기 렌더링 시 선택될 Trigger의 value',
    },
    listClassName: {
      control: 'text',
      description: 'Tabs.List 컴포넌트에 추가할 Tailwind CSS 클래스',
    },
    panelClassName: {
      control: 'text',
      description: 'Tabs.Panel 컴포넌트에 추가할 Tailwind CSS 클래스',
    },
    children: {
      control: false, // children prop은 Storybook에서 직접 제어하지 않음
      description: '탭 구성 요소들 (List, Trigger, Panel 등)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// 기본 Tabs 스토리
export const Default: Story = {
  args: {
    defaultValue: 'all',
    option: '커뮤니티 탭',
  },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Trigger value={'all'} label="전체글" />
        <Tabs.Trigger value={'bookmarked'} label="내가 찜한 글" />
        <Tabs.Trigger value={'written'} label="내가 작성한 글" />
        <Tabs.Trigger value={'commented'} label="댓글" />
      </Tabs.List>
      <Tabs.Panel value={'all'}>
        <div>내용1</div>
      </Tabs.Panel>
      <Tabs.Panel value={'bookmarked'}>
        <div>내용2</div>
      </Tabs.Panel>
      <Tabs.Panel value={'written'}>
        <div>내용3</div>
      </Tabs.Panel>
      <Tabs.Panel value={'commented'}>
        <div>내용4</div>
      </Tabs.Panel>
    </Tabs>
  ),
};

// 커스텀 스타일을 적용한 Tabs 스토리
export const WithCustomStyles: Story = {
  args: {
    ...Default.args, // Default 스토리의 기본 props를 상속
    listClassName: 'bg-blue-100',
    panelClassName: 'bg-blue-200 p-4',
  },
  render: (args) => (
    <div className="w-200pxr border">
      <p className="mb-2 text-sm">컨테이너 너비: 200px</p>
      <Tabs {...args}>
        <Tabs.List>
          <Tabs.Trigger value={'all'} label="전체글" />
          <Tabs.Trigger value={'bookmarked'} label="내가 찜한 글" />
          <Tabs.Trigger value={'written'} label="내가 작성한 글" />
          <Tabs.Trigger value={'commented'} label="댓글" />
        </Tabs.List>
        <Tabs.Panel value={'all'}>
          <div>내용1</div>
        </Tabs.Panel>
        <Tabs.Panel value={'bookmarked'}>
          <div>내용2</div>
        </Tabs.Panel>
        <Tabs.Panel value={'written'}>
          <div>내용3</div>
        </Tabs.Panel>
        <Tabs.Panel value={'commented'}>
          <div>내용4</div>
        </Tabs.Panel>
      </Tabs>
    </div>
  ),
};
