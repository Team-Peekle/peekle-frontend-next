export const EVENTS_API_ENDPOINTS = {
  TEST_TOKEN: 'auth/test-token', // 테스트용
  EVENTS: 'v1/events',
  EVENT_DETAIL: (eventId: string) => `v1/events/${eventId}`,
} as const;
