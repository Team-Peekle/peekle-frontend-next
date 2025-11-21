import { z } from 'zod';

/**
 * 이미지 객체 스키마
 */
const ImageSchema = z.object({
  imageUrl: z.string(),
  order: z.number().int(),
});

const EventDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  venueName: z.string().nullable(),
  venueRoadAddress: z.string().nullable(),
  venueJibunAddress: z.string().nullable(),
  venueDetailAddress: z.string().nullable(),
  price: z.number(),
  link: z.string(),
  description: z.string().nullable(),
  authorId: z.string(),
  category: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  images: z.array(ImageSchema),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  isScrapped: z.boolean(),
});

export const getEventDetailSchema = z.object({
  event: EventDetailSchema,
});

export type EventImage = z.infer<typeof ImageSchema>;
export type EventDetail = z.infer<typeof EventDetailSchema>;
