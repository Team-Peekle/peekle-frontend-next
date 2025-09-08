import { fetcher } from '@common/libs/api/common';

import { EVENTS_API_ENDPOINTS } from '../../constants/apiEndPoints';
import { getTestTokenSchema } from '../../schemas/getEventsSchema';

/**
 * 테스트 토큰 받아오는 함수
 *
 * 지정된 userId(`userId`)에 해당하는 jwt 토큰을 가져옵니다.
 *
 * @param {UserIdRequestDto} params - 요청 파라미터
 * @param {string} params.userId - 회의록을 조회할 워크스페이스 ID
 */
const getTestToken = async () => {
  const tokens = await fetcher(
    EVENTS_API_ENDPOINTS.TEST_TOKEN,
    { searchParams: { userId: '1' } },
    getTestTokenSchema,
  );

  return tokens;
};

export default getTestToken;
