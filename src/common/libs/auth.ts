import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

import { authOptions } from '@app/api/auth/[...nextauth]/route';

/** 서버 세션을 가져오는 함수 */
export const getSession = async () => {
  return getServerSession(authOptions);
};

/**
 * 서버 환경에서 세션에서 access token을 가져오는 함수.
 * 서버 컴포넌트나 API 라우트에서 사용됩니다.
 */
export const getAccessTokenServer = async () => {
  const session = await getServerSession(authOptions);
  return session?.accessToken;
};

/**
 * 클라이언트 환경에서 세션에서 access token을 가져오는 훅.
 * 클라이언트 컴포넌트에서 사용됩니다.
 */ export const useAccessTokenClient = () => {
  const { data: session } = useSession();
  return session?.accessToken;
};
