import { queryOptions } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import { authenticatedClientFetcher } from '@common/libs/api/client';
import { fetcher } from '@common/libs/api/common';

import { POLICY_API_ENDPOINTS } from '@features/policy/constants/apiEndPoints';

import { GetPolicyResponseDTO, getPolicyResponseSchema } from '@features/policy/schemas/api/policy';

/**
 * GET /v1/users/terms/all
 * 약관 조회
 */
export const getPolicyOptions = () => {
  return queryOptions<GetPolicyResponseDTO>({
    queryKey: queryKeys.user.me.queryKey,
    queryFn: () =>
      // authenticatedClientFetcher(POLICY_API_ENDPOINTS.TERMS_ALL, getUsersMeResponseSchema, {
      //   method: 'GET',
      // }),
      fetcher(POLICY_API_ENDPOINTS.TERMS_ALL, getPolicyResponseSchema, {
        method: 'GET',
      }),
  });
};
