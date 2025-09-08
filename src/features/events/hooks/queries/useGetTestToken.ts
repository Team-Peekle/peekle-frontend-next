import queryKeys from '@common/constants/queryKeys';

import { useAfterQuery } from '@common/hooks/queries/useAfterQuery';

import getTestToken from '../../apis/get/getTestToken';
import { type GetTestTokenReponseDTO } from '../../schemas/getTestTokenSchema';

/**
 * getTestToken을 호출해 테스트 토큰 정보를 가져오는 훅
 */
const useGetTestToken = () => {
  return useAfterQuery<GetTestTokenReponseDTO>({
    queryKey: queryKeys.events.testToken.queryKey,
    queryFn: getTestToken,
    enabled: true,
    onSuccess: () => {
      console.log('onSuccess 콜백 실행');
    },
  });
};

export default useGetTestToken;
