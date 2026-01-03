import { PageContextType } from '@common/types/routes';
import { TermsType } from '@common/types/terms';

export const ROUTES = {
  /** 이벤트 페이지 경로 */
  ROOT: '/',
  EVENTS: {
    DETAIL: (id: string) => `/${id}`,
  },
  COMMUNITY: '/community',
  SEARCH: '/search',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  SETTING: '/setting',
  TERMS: {
    [TermsType.PRIVACY]: '/policy/privacy',
    [TermsType.TERMS]: '/policy/terms',
    [TermsType.CONTACT]: '/policy/contact',
  },
  SIGNUP_COMPLETE: '/signup/complete',
  NOT_FOUND: '/not-found', // 실제로 없는 주소 - 404 페이지 수동으로 띄우기 위해
} as const;

export const PAGE_CONTEXT_LABELS = {
  [PageContextType.EVENT]: '이벤트',
  [PageContextType.COMMUNITY]: '커뮤니티',
} as const;
