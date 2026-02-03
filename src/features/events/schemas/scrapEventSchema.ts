import { z } from 'zod';

export const scrapEventSchema = z.object({
  eventId: z.string(),
  scrapped: z.boolean(),
});

export const cancleScrapEventSchema = z.object({
  eventId: z.string(),
  scrapped: z.boolean(),
});
