'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Tab from './Tab.server';

const tabs = [
  { value: 'all', label: '전체글' },
  { value: 'favorite', label: '내가 찜한 글' },
  { value: 'my-post', label: '내가 작성한 글' },
  { value: 'comment', label: '댓글' },
];

export default function CommunityTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleTabClick = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', tabValue);
    router.push(`/community?${params.toString()}`);
  };

  return (
    <div className="max-mb:gap-[6px] flex gap-[8px]">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          isActive={currentCategory === tab.value}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </Tab>
      ))}
    </div>
  );
}
