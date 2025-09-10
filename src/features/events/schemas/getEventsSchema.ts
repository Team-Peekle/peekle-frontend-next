import { z } from 'zod';

import { Category, PriceCurrency, PriceType } from '../types/filter';

export const getEventsSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      period: z.object({
        start: z.string(),
        end: z.string(),
      }),
      price: z.object({
        amount: z.number(),
        type: z.enum(PriceType),
        currency: z.enum(PriceCurrency),
      }),
      category: z.enum(Category),
      thumbnailUrl: z.string().nullable(),
    }),
  ),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
});

export type GetEventsReponseDTO = z.infer<typeof getEventsSchema>;
