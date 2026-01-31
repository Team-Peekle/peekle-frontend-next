import { TermsType } from '@common/types/terms';

/**
 * @description TermsType에 따라 매핑되는 한국어 레이블
 */
export const TERMS_LABELS = {
  [TermsType.PRIVACY]: '개인정보처리방침',
  [TermsType.TERMS]: '서비스 이용약관',
  [TermsType.CONTACT]: '문의하기',
} as const;

export const POLICY_LINKS = {
  [TermsType.PRIVACY]:
    'https://factual-actor-934.notion.site/2f3a5c8bf53780beb539e0fb68bba16a?pvs=74',
  [TermsType.TERMS]:
    'https://factual-actor-934.notion.site/2f3a5c8bf53780329610c7e59b84c839?pvs=74',
};
