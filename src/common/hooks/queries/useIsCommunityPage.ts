import { usePathname } from 'next/navigation';

import { ROUTES } from '@common/constants/routes';

/**
 * 현재 페이지가 커뮤니티 페이지인지 확인하는 커스텀 훅
 */
export default function useIsCommunityPage() {
  const pathname = usePathname();
  return pathname.startsWith(ROUTES.COMMUNITY);
}
