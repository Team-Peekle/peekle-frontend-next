import { z } from 'zod';

export const policySchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isRequired: z.boolean(),
});

export type PolicyItem = z.infer<typeof policySchema>;

/**
 * 모든 약관 조회 API 응답 스키마
 */
export const getPolicyResponseSchema = z.object({
  items: z.array(policySchema),
});

export type GetPolicyResponseDTO = z.infer<typeof getPolicyResponseSchema>;
