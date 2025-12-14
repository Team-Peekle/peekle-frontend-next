'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { ProfileVariant } from '@common/types/profile';

import { ROUTES } from '@common/constants/routes';

import UserProfile from '@common/components/UserProfile.client';

import { getUsersMeOptions } from '@features/setting/apis/get/userOptions';

const ProfileRow = () => {
  const { data: userInfo } = useQuery(getUsersMeOptions());

  return (
    <div className="flex items-center justify-between">
      <span className="gap-x-12pxr flex items-center">
        <UserProfile variant={ProfileVariant.SIZE_40} />
        <p className="text-p16sb text-gray-800">{userInfo?.nickname}</p>
      </span>
      <Link
        href={ROUTES.MODAL.SETTING.PROFILE_EDIT}
        className="text-p14 rounded-8pxr py-5pxr pa-10pxr shrink-0 bg-gray-100 text-gray-900"
      >
        프로필 수정
      </Link>
    </div>
  );
};

export default ProfileRow;
