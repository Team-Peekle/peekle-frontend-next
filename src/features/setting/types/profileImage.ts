import { UploadStatus } from '../schemas/api/user';

/**
 * 프로필 이미지 S3 업르드용 타입
 */
export interface ProfileImageUI {
  id: string;
  imageUrl: string;
  order: number;
  file: File | null;
  previewUrl: string;
  status: UploadStatus;
  shouldRevoke: boolean;
  isNew: boolean;
  errorMessage?: string;
}
