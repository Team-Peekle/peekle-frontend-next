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
  MY: '/my',
  MODAL: {
    EVENTS: {
      FILTER: '/filter',
      CONFIRM_LOCATION: '/confirm-location',
    },
  },
  SIGNUP_COMPLETE: '/signup/complete',
} as const;
