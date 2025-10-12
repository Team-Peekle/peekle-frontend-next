import { useMemo } from 'react';

import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

import { type RegisterTokenPayload, registerTokenPayloadSchema } from '../schemas/auth';

/**
 * RegisterToken을 파싱해서 OAuth 사용자 정보를 반환하는 훅
 */
export const useOauthInfo = (): RegisterTokenPayload | null => {
  return useMemo(() => {
    try {
      const registerToken = getCookie('registerToken');
      if (!registerToken || typeof registerToken !== 'string') {
        console.warn('[useOauthInfo] registerToken이 없습니다.');
        return null;
      }

      const parsedPayload = jwtDecode<RegisterTokenPayload>(registerToken);

      const result = registerTokenPayloadSchema.safeParse(parsedPayload);
      if (!result.success) {
        console.error('[useOauthInfo] 스키마 검증 실패:', result.error);
        return null;
      }

      return result.data;
    } catch (error) {
      console.error('[useOauthInfo] 파싱 중 에러:', error);
      return null;
    }
  }, []);
};
