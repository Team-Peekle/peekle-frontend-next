'use client';

import { Suspense } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProfileVariant } from '@common/types/profile';

import { getUsersMeOptions } from '@features/setting/apis/get/userOptions';

import Profile from './Profile.server';

interface UserProfileProps {
  variant?: ProfileVariant;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

function UserProfileContent({ variant, className, isSelected, onClick }: UserProfileProps) {
  const { data: userInfo } = useQuery(getUsersMeOptions());

  return (
    <Profile
      src={userInfo?.profileImage || undefined}
      alt={userInfo?.nickname || 'Profile'}
      variant={variant}
      className={className}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
}

function UserProfileFallback({ variant, className, isSelected, onClick }: UserProfileProps) {
  return (
    <Profile variant={variant} className={className} isSelected={isSelected} onClick={onClick} />
  );
}

export default function UserProfile(props: UserProfileProps) {
  return (
    <Suspense fallback={<UserProfileFallback {...props} />}>
      <UserProfileContent {...props} />
    </Suspense>
  );
}
