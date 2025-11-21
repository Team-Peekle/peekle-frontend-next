export const EVENTS_API_ENDPOINTS = {
  TEST_TOKEN: 'auth/test-token', // 테스트용
  EVENTS: 'events',
  EVENT_DETAIL: (eventId: string) => `events/${eventId}`,
  SCRAP: (eventId: string) => `events/${eventId}/scrap`,
} as const;
