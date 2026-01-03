'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ProfileVariant } from '@common/types/profile';

import useNicknameCheck from '@common/hooks/queries/useNicknameCheck';
import { useAddToast } from '@common/hooks/stores/useToastStore';
import useDebounce from '@common/hooks/useDebounce';

import Cta from '@common/components/btn/Cta/Cta.client';
import { Plus } from '@common/components/svg/Plus';

import { getUsersMeOptions } from '@common/apis/get/userOptions';

import { nicknameSchema } from '@features/sign/types/signupSchema';

import { useCommunityPresignedUploader } from '@features/community/hooks/useCommunityPresignedUploader';
import useChangeNickname from '@features/setting/hooks/mutations/useChangeNickname';

import Profile from '../Profile.server';
import Textfield from '../Textfield';

interface ProfileEditProps {
  onClose: () => void;
}

const ProfileEdit = ({ onClose }: ProfileEditProps) => {
  const router = useRouter();
  const { data: userInfo } = useSuspenseQuery(getUsersMeOptions());
  const { mutate: changeNicknameMutate, isPending: isNicknameChanging } = useChangeNickname();
  const addToast = useAddToast();
  const { upload, isUploading, error: uploadError, resetError } = useCommunityPresignedUploader();

  // 임시 프로필 주소
  const initialProfiles = ['임시 프사 주소1', '임시 프사 주소2', '임시 프사 주소3'];
  const mainProfileSrc = initialProfiles[0];

  const [currentProfileSrc, setCurrentProfileSrc] = useState(mainProfileSrc);
  const [currentNickname, setCurrentNickname] = useState(userInfo.nickname);
  const debouncedValue = useDebounce(currentNickname, 500);
  const [isChanged, setIsChanged] = useState(false);

  // 닉네임 Zod 유효성 검사 수행
  const validation = nicknameSchema.safeParse(currentNickname);
  const hasValidationError = !validation.success;
  const validationErrorMessage = !validation.success ? validation.error.issues[0].message : null;

  // 기존 닉네임과 동일한지 확인
  const isSameNickname = debouncedValue === userInfo.nickname;
  const { data: checkData, isLoading: isChecking } = useNicknameCheck(
    debouncedValue,
    hasValidationError || isSameNickname,
  );

  // 최종 에러 메시지
  const getHelperText = () => {
    // 형식 에러가 우선
    if (hasValidationError) return validationErrorMessage ?? '';
    // 입력값이 기존 닉네임과 같다면 중복 체크 메시지를 띄우지 않음
    if (currentNickname === userInfo.nickname) return '닉네임을 수정하면 30일간 변경할 수 없어요';
    // 중복 체크 결과 처리
    if (isChecking) return '중복 확인 중...';
    if (checkData && !checkData.available) return '이미 사용 중인 닉네임이에요.';
    if (checkData?.available === true) return '사용할 수 있는 닉네임이에요.';
    return '닉네임을 수정하면 30일간 변경할 수 없어요';
  };

  // 텍스트필드 상태값 계산
  const getTextfieldStatus = () => {
    if (currentNickname === userInfo.nickname) return 'default';
    if (hasValidationError) return 'error';
    if (checkData?.available === false) return 'error';
    if (checkData?.available === true) return 'success';
    return 'default';
  };

  const isNicknameError = !isSameNickname && (hasValidationError || !checkData?.available);

  // 변경 사항 확인 로직
  useEffect(() => {
    const profileChanged = currentProfileSrc !== mainProfileSrc;
    const nicknameChanged = currentNickname !== userInfo.nickname;

    setIsChanged((profileChanged || nicknameChanged) && !isNicknameError);
  }, [currentProfileSrc, currentNickname, mainProfileSrc, userInfo.nickname, isNicknameError]);

  const handleProfileClick = (src: string) => {
    setCurrentProfileSrc(src);
  };

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNickname(e.target.value);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleEdit = () => {
    if (isNicknameChanging) return;

    const nicknameChanged = currentNickname !== userInfo.nickname;
    // TODO: 프사 배열 변경 여부 체크
    const profileChanged = false;

    // 닉네임이 변경된 경우 API 호출
    if (nicknameChanged) {
      changeNicknameMutate(
        { newNickname: currentNickname },
        {
          onSuccess: () => {
            addToast({ text: '닉네임이 변경되었습니다.' });
            // 프로필 이미지 변경 로직이 따로 없다면 여기서 종료
            if (!profileChanged) onClose();
          },
        },
      );
    }

    // 프로필 이미지가 변경된 경우
    if (profileChanged) {
      // TODO: 프로필 이미지 변경 API 호출 로직
      if (!nicknameChanged) onClose(); // 닉네임 변경 없이 이미지만 바뀐 경우
    }

    // 변경 사항이 없거나 처리가 시작되면 버튼 비활성화
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
          placeholder="사용하실 닉네임을 입력해주세요."
          label="닉네임"
          minLength={2}
          maxLength={10}
          helperText={getHelperText()}
          status={getTextfieldStatus()}
          value={currentNickname}
          onChange={handleChangeNickname}
        />
      </div>
      <div className="gap-12pxr py-16pxr px-20pxr flex flex-row border-t border-t-gray-100">
        <Cta text="취소" onClick={handleCancel} className="flex-1" />
        <Cta
          text={isNicknameChanging ? '변경 중...' : '변경하기'}
          disabled={!isChanged || isNicknameChanging}
          onClick={handleEdit}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
