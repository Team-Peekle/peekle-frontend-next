'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import { ROUTES } from '@common/constants/routes';

import Cta from '@common/components/btn/Cta/Cta.client';
import { Plus } from '@common/components/svg/Plus';

import Profile from '../Profile.server';
import Textfield from '../Textfield';

const ProfileEdit = () => {
  const router = useRouter();
  // 임시 시용자 정보들
  const initialProfiles = ['임시 프사 주소1', '임시 프사 주소2', '임시 프사 주소3'];
  const initialNickname = '임시 닉네임';
  const mainProfileSrc = initialProfiles[0];

  const [currentProfileSrc, setCurrentProfileSrc] = useState(mainProfileSrc);
  const [currentNickname, setCurrentNickname] = useState(initialNickname);
  const [isChanged, setIsChanged] = useState(false);

  // 변경 사항 확인용
  useEffect(() => {
    const profileChanged = currentProfileSrc !== initialProfiles[0];
    const nicknameChanged = currentNickname !== initialNickname;
    setIsChanged(profileChanged || nicknameChanged);
  }, [currentProfileSrc, currentNickname, initialProfiles, initialNickname]);

  const handleProfileClick = (src: string) => {
    setCurrentProfileSrc(src);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNickname(e.target.value);
  };

  const handleCancel = () => {
    setCurrentProfileSrc(initialProfiles[0]);
    setCurrentNickname(initialNickname);
  };

  const handleEdit = () => {
    // URL에 쿼리 파라미터를 붙여 모달 경로로 이동
    router.push(
      `${ROUTES.MODAL.SETTING.CHANGE_NICKNAME}?newNickname=${encodeURIComponent(currentNickname)}`,
    );
    setIsChanged(false);
  };

  return (
    <div className="gap-16pxr rounded-20pxr bg-gray-0 flex h-fit w-fit flex-shrink-0 flex-col">
      <header className="text-p18 p-16pxr border-b border-b-gray-100 text-center text-gray-700">
        프로필 수정
      </header>
      <div className="gap-44pxr px-20pxr pb-32pxr flex flex-col">
        <span className="gap-16pxr flex flex-col">
          <p className="text-p16sb text-gray-800">프로필 이미지</p>
          <div className="gap-40pxr flex flex-row items-center justify-center">
            <Profile src={currentProfileSrc} variant={ProfileVariant.SIZE_96} />
            <span className="gap-10pxr flex flex-row items-center">
              {initialProfiles.map((src) => (
                <Profile
                  key={src}
                  src={src}
                  variant={ProfileVariant.SIZE_40}
                  isSelected={currentProfileSrc === src}
                  onClick={() => handleProfileClick(src)}
                />
              ))}
              <button
                aria-label="프로필 사진 추가 버튼"
                className="w-40pxr h-40pxr flex items-center justify-center rounded-full bg-gray-100"
                onClick={() => console.log('프로필 사진 추가 클릭')}
              >
                <Plus className="w-14pxr h-14pxr text-gray-400" />
              </button>
            </span>
          </div>
        </span>
        <Textfield
          placeholder="임시 닉네임"
          label="닉네임"
          helperText="닉네임을 수정하면 30일간 변경할 수 없어요"
          value={currentNickname}
          onChange={handleChangeNickname}
        />
      </div>
      <div className="gap-12pxr py-16pxr px-20pxr flex flex-row border-t border-t-gray-100">
        <Cta text="취소" disabled={!isChanged} onClick={handleCancel} />
        <Cta text="변경하기" disabled={!isChanged} onClick={handleEdit} />
      </div>
    </div>
  );
};

export default ProfileEdit;
