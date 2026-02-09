'use client';

import { useEffect, useRef, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { X } from 'lucide-react';

import { ProfileVariant } from '@common/types/profile';

import useNicknameCheck from '@common/hooks/queries/useNicknameCheck';
import { useAddToast } from '@common/hooks/stores/useToastStore';
import useDebounce from '@common/hooks/useDebounce';
import useImagePreloader from '@common/hooks/useImagePreloader';

import Loader from '@common/components/DeferredLoader/DeferredLoader.client';
import Profile from '@common/components/Profile.server';
import Textfield from '@common/components/Textfield';
import Cta from '@common/components/btn/Cta/Cta.client';
import ModalLayout from '@common/components/modal/ModalLayout.client';
import { Plus } from '@common/components/svg/Plus';

import { getUsersMeOptions } from '@common/apis/get/userOptions';

import { ProfileImageUI } from '@features/setting/types/profileImage';
import { nicknameSchema } from '@features/sign/types/signupSchema';

import { UpdateProfileImageRequestDTO, UploadStatusEnum } from '@features/setting/schemas/api/user';

import useChangeProfileImage from '@features/setting/hooks/mutations/useChangeProfileImage';
import useProfilePresignedUploader from '@features/setting/hooks/useProfilePresignedUploader';

import ChangeNicknameConfirm from './ChangeNicknameConfirm.client';

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

interface ProfileEditProps {
  onClose: () => void;
}

const ProfileEdit = ({ onClose }: ProfileEditProps) => {
  const { data: userInfo } = useSuspenseQuery(getUsersMeOptions());
  const { upload, cancelUpload, error: uploadError } = useProfilePresignedUploader();
  const { mutate: updateProfileImages } = useChangeProfileImage();
  const addToast = useAddToast();

  // 비동기 로직, setState 내부에서는 테스트 큐에서 토스트 setState 사용
  const safeAddToast = (toast: { text: string }) => {
    setTimeout(() => addToast(toast), 0);
  };

  // 프로필
  // 프로필 초기 상태 설정
  const [profileImgList, setProfileImgList] = useState<ProfileImageUI[]>(
    userInfo.profileImages.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
      previewUrl: img.imageUrl, // 기존 이미지는 이미지 URL 자체가 프리뷰
      order: img.order,
      file: null, // 기존 이미지는 파일 객체가 없음
      status: UploadStatusEnum.enum.uploaded, // 이미 서버에 올라간 상태
      isNew: false, // 새로 추가된 것이 아님
      shouldRevoke: false, // 삭제되지 않아도 됨
    })),
  );
  const [selectedImageId, setSelectedImageId] = useState(userInfo.profileImages[0]?.id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [removedImageUrls, setRemovedImageUrls] = useState<Set<string>>(new Set());
  const [validateError, setValidateError] = useState<string | null>(null);
  // 메인 이미지 - 제일 첫번째
  const mainPreviewSrc = profileImgList[0]?.previewUrl ?? profileImgList[0]?.imageUrl ?? '';
  // 로드가 완료된 src만 반환하는 상태값
  const smoothSrc = useImagePreloader(mainPreviewSrc);
  // 서버에 보낼 페이로드
  const [finalProfilePayload, setFinalProfilePayload] = useState<UpdateProfileImageRequestDTO[]>(
    [],
  );
  // 닉네임
  const [currentNickname, setCurrentNickname] = useState(userInfo.nickname);
  const debouncedValue = useDebounce(currentNickname, 500);
  const [isChanged, setIsChanged] = useState(false);
  const [isOpenChangeNicknameConfirm, setIsOpenChangeNicknameConfirm] = useState(false);

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
  // 닉네임 복원 함수
  const resetNickname = () => {
    setCurrentNickname(userInfo.nickname);
  };

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
    // 닉네임 변경 여부
    const nicknameChanged = currentNickname !== userInfo.nickname;
    // 프로필 이미지 리스트 변경 여부 (새 파일 추가 || 기존 이미지 삭제)
    const profileListChanged =
      profileImgList.length !== userInfo.profileImages.length || // 개수가 다르거나
      profileImgList.some((img, idx) => img.imageUrl !== userInfo.profileImages[idx]?.imageUrl); // 순서/내용이 다르거나
    // 메인 이미지 선택 변경 여부
    const isMainImageChanged = selectedImageId !== userInfo.profileImages[0]?.id;

    // 위 항목 중 하나라도 해당하면 변경됨으로 간주
    const hasChanges = nicknameChanged || profileListChanged || isMainImageChanged;

    setIsChanged(hasChanges && !isNicknameError && !validateError && !uploadError);
  }, [selectedImageId, currentNickname, userInfo, isNicknameError]);

  // 닉네임 변경
  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNickname(e.target.value);
  };

  // 취소
  const handleCancel = () => {
    onClose();
  };

  // 파일 검증
  const validateFiles = (files: File[]) => {
    const valid: File[] = [];
    const errors: string[] = [];
    for (const f of files) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        errors.push(`${f.name}: 지원하지 않는 형식`);
        continue;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`${f.name}: ${MAX_SIZE_MB}MB 초과`);
        continue;
      }
      valid.push(f);
    }
    return { valid, errors };
  };

  const uploadSingle = async (file: File, id: string) => {
    const res = await upload([file], id);

    if (!res || res.length === 0) {
      throw new Error('업로드 응답을 받지 못했습니다.');
    }

    return res[0];
  };

  // 이미지 추가
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // 현재 남은 자리 계산
    const currentCount = profileImgList.length;
    const remainingSlots = MAX_IMAGES - currentCount;

    // 자리가 아예 없는 경우
    if (remainingSlots <= 0) {
      safeAddToast({ text: `최대 ${MAX_IMAGES}장까지만 업로드할 수 있습니다.` });
      event.target.value = ''; // 같은 파일을 다시 올릴 수 있도록 초기화
      return;
    }

    // 선택한 파일이 남은 자리보다 많은 경우 알림 후 잘라내기
    let filesToUpload = Array.from(files);
    if (filesToUpload.length > remainingSlots) {
      safeAddToast({ text: `남은 사진 개수에 맞춰 ${remainingSlots}장의 사진만 추가합니다.` });
      filesToUpload = filesToUpload.slice(0, remainingSlots);
    }
    // 유효성 검사 (용량, 형식 등)
    const { valid, errors } = validateFiles(filesToUpload);

    // 에러 토스트로 출력
    if (errors.length > 0) {
      errors.forEach((err) => safeAddToast({ text: err }));
    }

    if (valid.length === 0) return;

    const newFiles = valid.map((file, index) => ({
      id: crypto.randomUUID(), // 임시 ID
      imageUrl: '', // 아직 S3 URL이 없음
      previewUrl: URL.createObjectURL(file), // 프리뷰용 (blob:)
      order: profileImgList.length + index,
      status: UploadStatusEnum.enum.uploading,
      shouldRevoke: true,
      isNew: true,
      file,
    }));

    // profileImgList 업데이트 (기존 리스트 + 새로운 아이템들)
    setProfileImgList((prev) => [...prev, ...newFiles]);

    // 비동기 업로드
    const results = await Promise.allSettled(
      newFiles.map((file) => uploadSingle(file.file, file.id)),
    );

    setProfileImgList((prev) => {
      const newList = [...prev];

      newFiles.forEach((newFile, index) => {
        const result = results[index];
        const targetIdx = newList.findIndex((item) => item.id === newFile.id);

        if (targetIdx === -1) return;
        if (result.status === 'fulfilled' && result.value?.fileUrl) {
          newList[targetIdx] = {
            ...newList[targetIdx],
            imageUrl: result.value.fileUrl,
            previewUrl: result.value.fileUrl,
            status: UploadStatusEnum.enum.uploaded,
            file: null,
          };
        } else if (result.status === 'rejected') {
          newList[targetIdx] = {
            ...newList[targetIdx],
            status: UploadStatusEnum.enum.failed,
            errorMessage: result.status === 'rejected' ? result.reason?.message : '업로드 실패',
          };
        }
      });

      return newList;
    });
    // 에러 토스트 띄우기
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        safeAddToast({ text: `${newFiles[index].file.name} 파일 업로드 실패` });
      }
    });
  };

  const handleRemoveImage = (id: string) => {
    // 사진이 하나 남았을때 대표 사진(index 0)은 삭제 방지
    if (profileImgList.length === 1 && profileImgList[0]?.id === id) {
      safeAddToast({ text: '대표 사진은 삭제할 수 없습니다.' });
      return;
    }
    setProfileImgList((prev) => {
      const target = prev.find((img) => img.id === id);
      if (!target) return prev;
      // 메모리 해제 (shouldRevoke가 true인 경우 blob URL 청소)
      if (target.shouldRevoke && target.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      // 서버에서 온 이미지를 지운다면 삭제 목록에 추가
      // if (!target.isNew && target.imageUrl) {
      //   setRemovedImageUrls((s) => new Set(s).add(target.imageUrl!));
      // }

      // 리스트에서 제거 후 order 재할당
      // 필터링 후 map을 돌려 모든 이미지의 order를 현재 인덱스에 맞게 동기화
      return prev.filter((img) => img.id !== id).map((img, idx) => ({ ...img, order: idx }));
    });
  };

  const retryUpload = async (id: string) => {
    const target = profileImgList.find((i) => i.id === id);
    if (!target || target.status !== UploadStatusEnum.enum.failed || !target.file) return;

    setProfileImgList((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: UploadStatusEnum.enum.uploading, errorMessage: undefined }
          : i,
      ),
    );

    try {
      const r = await uploadSingle(target.file, target.id);
      if (!r?.fileUrl) throw new Error('업로드 실패');
      setProfileImgList((prev) =>
        prev.map((i) => {
          if (i.id !== id) return i;
          if (i.shouldRevoke) URL.revokeObjectURL(i.previewUrl);
          return {
            ...i,
            imageUrl: r.fileUrl,
            previewUrl: r.fileUrl,
            status: UploadStatusEnum.enum.uploaded,
            shouldRevoke: false,
            file: null,
          };
        }),
      );
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : typeof e === 'string' ? e : '업로드 실패';
      // 에러 발생 시 토스트 띄우기
      safeAddToast({ text: errorMessage });
      setProfileImgList((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: 'failed', errorMessage } : i)),
      );
    }
  };

  const handleEdit = async () => {
    // 아직 업로드 중인 이미지가 있는지 확인
    if (profileImgList.some((img) => img.status === UploadStatusEnum.enum.uploading)) {
      setValidateError('이미지 업로드 중입니다. 잠시만 기다려주세요.');
      return;
    }

    // 업로드에 실패한 이미지가 있다면 사용자에게 알림
    const hasFailed = profileImgList.some((img) => img.status === UploadStatusEnum.enum.failed);
    if (hasFailed) {
      setValidateError('업로드 실패한 이미지가 있습니다. 삭제하거나 재시도해주세요.');
      return;
    }

    // 이미 완료된 URL들로 페이로드 구성
    const finalProfilePayload = profileImgList
      .filter((img) => img.status === UploadStatusEnum.enum.uploaded)
      .map((img, idx) => ({
        imageUrl: img.imageUrl,
        order: idx, // 현재 리스트 순서대로 order 부여
      }));

    if (finalProfilePayload.length === 0) {
      setValidateError('최소 한 장 이상의 프로필 이미지가 필요합니다.');
      return;
    }

    const nicknameChanged = currentNickname !== userInfo.nickname;

    if (nicknameChanged) {
      // 닉네임 컨펌 모달 오픈
      setFinalProfilePayload(finalProfilePayload);
      setIsOpenChangeNicknameConfirm(true);
    } else {
      // 이미지 전용 API 호출
      updateProfileImages({ newProfileImages: finalProfilePayload });
      safeAddToast({ text: '프로필 이미지가 변경되었습니다.' });
      onClose();
    }
  };

  const handleProfileClick = (id: string) => {
    setSelectedImageId(id);
    setProfileImgList((prev) => {
      const targetIndex = prev.findIndex((img) => img.id === id);
      if (targetIndex === -1) return prev;

      const newList = [...prev];
      const [selectedItem] = newList.splice(targetIndex, 1); // 선택한 아이템 추출
      newList.unshift(selectedItem); // 맨 앞으로 삽입

      // 순서(order) 재할당
      return newList.map((img, idx) => ({ ...img, order: idx }));
    });
  };

  const handleCancelUpload = (id: string) => {
    // 네트워크 요청 중단
    cancelUpload(id);

    // UI 리스트에서 제거 및 메모리 해제
    setProfileImgList((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.shouldRevoke && target.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  return (
    <>
      <div className="gap-16pxr rounded-20pxr bg-gray-0 w-370pxr flex h-fit flex-shrink-0 flex-col">
        <header className="text-p18 p-16pxr border-b border-b-gray-100 text-center text-gray-700">
          프로필 수정
        </header>
        <div className="gap-44pxr px-20pxr pb-32pxr flex flex-col">
          <span className="gap-16pxr flex flex-col">
            <p className="text-p16sb text-gray-800">프로필 이미지</p>
            <div className="gap-40pxr flex flex-row items-center">
              <Profile src={smoothSrc} variant={ProfileVariant.SIZE_96} />
              <span className="gap-10pxr flex flex-row items-center">
                {profileImgList.map((image, index) => (
                  <div key={image.id} className="relative inline-block">
                    <Profile
                      key={image.id}
                      src={image.previewUrl}
                      variant={ProfileVariant.SIZE_40}
                      isSelected={selectedImageId === image.id}
                      onClick={() => handleProfileClick(image.id)}
                    />

                    {/* 업로드 성공한 이미지만 삭제 버튼 표시 */}
                    {index !== 0 && image.status === UploadStatusEnum.enum.uploaded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(image.id);
                        }}
                        className="-top-2pxr -right-2pxr h-18pxr w-18pxr absolute flex items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                        aria-label="이미지 삭제"
                      >
                        <X size={10} />
                      </button>
                    )}

                    {/* 업로드 중 상태 UI */}
                    {image.status === UploadStatusEnum.enum.uploading && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white">
                        <Loader size={24} />
                      </div>
                    )}

                    {/* 업로드 실패 상태 UI */}
                    {image.status === UploadStatusEnum.enum.failed && (
                      <div className="gap-y-4pxr absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/50 text-white">
                        <button
                          className="text-8pxr px-4pxr rounded bg-gray-200 font-bold text-gray-900 hover:bg-gray-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelUpload(image.id);
                          }}
                        >
                          취소
                        </button>
                        <button
                          className="text-8pxr px-4pxr rounded bg-white font-bold text-gray-900 hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            retryUpload(image.id);
                          }}
                        >
                          재시도
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {profileImgList.length < MAX_IMAGES && (
                  <button
                    aria-label="프로필 사진 추가 버튼"
                    className="w-40pxr h-40pxr flex items-center justify-center rounded-full bg-gray-100"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="w-14pxr h-14pxr text-gray-400" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleFileSelect}
                />
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
            text={isChecking ? '중복 확인 중...' : '변경하기'}
            disabled={!isChanged}
            onClick={handleEdit}
            className="flex-1"
          />
        </div>
      </div>
      {isOpenChangeNicknameConfirm && (
        <ModalLayout canClickDimmed={false}>
          <ChangeNicknameConfirm
            newNickname={currentNickname}
            newProfileImages={finalProfilePayload} // 변경된 이미지 배열 전달
            onClose={() => setIsOpenChangeNicknameConfirm(false)}
            onParentClose={onClose}
            onResetNickname={resetNickname}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ProfileEdit;
