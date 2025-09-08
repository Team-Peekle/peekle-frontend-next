import { z } from 'zod';

export const getEventsSchema = z.object({
  events: z.array(
    // ✅ TODO: 이벤트 스키마 구체화 필요
    z.object({
      id: z.string(),
    }),
  ),
  nextCursor: z.number().optional().nullable(),
  hasNextPage: z.boolean(),
});

export type GetEventsReponseDTO = z.infer<typeof getEventsSchema>;
