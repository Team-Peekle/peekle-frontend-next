'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Tab from './Tab.server';

const tabs = [
  { value: 'ALL', label: '전체글' },
  { value: 'LIKE', label: '내가 찜한 글' },
  { value: 'MY', label: '내가 작성한 글' },
  { value: 'COMMENT', label: '내가 댓글 적은 글' },
];

export default function CommunityTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('filterType') || 'ALL';

  const handleTabClick = (tabValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('filterType', tabValue);
    // 페이지 변경 시 첫 페이지로 리셋
    params.set('page', '1');
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
