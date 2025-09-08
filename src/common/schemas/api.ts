import { z } from 'zod';

/** 성공 응답을 위한 스키마 (성공 시 데이터 타입은 제네릭으로 처리) */
export const successSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.literal(true),
    statusCode: z.number(),
    message: z.string(),
    data: dataSchema,
  });

/** error 스키마 */
export const errorSchema = z.object({
  errorCode: z.string(),
  reason: z.string(),
  data: z.any().nullable(),
});

/** 실패 응답을 위한 스키마 */
export const failSchema = z.object({
  status: z.literal(false),
  statusCode: z.number(),
  error: errorSchema,
});

/** 성공 또는 실패 응답을 처리하는 공통 스키마 */
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.union([successSchema(dataSchema), failSchema]);
