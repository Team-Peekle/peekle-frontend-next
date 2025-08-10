import { TermsType } from '@common/types/terms';

/**
 * @description TermsType에 따라 매핑되는 한국어 레이블
 */
export const TermsLabels = {
  [TermsType.PRIVACY]: '개인정보처리방침',
  [TermsType.TERMS]: '서비스이용약관',
  [TermsType.CONTACT]: '문의하기',
} as const;
