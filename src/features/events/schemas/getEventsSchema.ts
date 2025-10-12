import { z } from 'zod';

// import { CategoryType } from '../types/category';
import { PriceCurrency, PriceType } from '../types/filter';

export const eventSchema = z.object({
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
  category: z.string(),
  thumbnailUrl: z.string().nullable(),
  latitude: z.number(),
  longitude: z.number(),
  region: z.string(),
  distance: z.number().nullable(),
  isScrapped: z.boolean(),
});

export type Event = z.infer<typeof eventSchema>;

export const getEventsSchema = z.object({
  events: z.array(eventSchema),
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
});

export type GetEventsReponseDTO = z.infer<typeof getEventsSchema>;
