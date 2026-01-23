import { authenticatedClientFetcher } from '@common/libs/api/client';

import { WithdrawResponseScheme } from '@features/setting/schemas/api/user';

/**
 * 로그아웃 API
 */
export const withdraw = async () => {
  return authenticatedClientFetcher('v1/users/me', WithdrawResponseScheme, {
    method: 'DELETE',
  });
};
