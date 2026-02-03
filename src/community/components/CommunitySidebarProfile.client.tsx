'use client';

import { useQuery } from '@tanstack/react-query';

import { ProfileVariant } from '@common/types/profile';

import { loginStore } from '@common/stores/loginStore';

import Profile from '@common/components/Profile.server';

import { getUsersMeOptions } from '@common/apis/get/userOptions';

export default function CommunitySidebarProfile() {
  const { isLoggedIn } = loginStore();

  const { data: userInfo } = useQuery({
    ...getUsersMeOptions(),
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) {
    return (
      <div className="flex flex-row items-center gap-2.5">
        <Profile variant={ProfileVariant.SIZE_40} />
        <p className="text-p17b text-gray-400">로그인이 필요합니다</p>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex flex-row items-center gap-2.5">
        <Profile variant={ProfileVariant.SIZE_40} />
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-2.5">
      <Profile
        variant={ProfileVariant.SIZE_40}
        src={userInfo.profileImages[0]?.imageUrl}
        alt={userInfo.nickname}
      />
      <p className="text-p17b">{userInfo.nickname}</p>
    </div>
  );
}
