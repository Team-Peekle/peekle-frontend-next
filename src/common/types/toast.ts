/**
 * @description 토스트 아이템 인터페이스
 */
export interface ToastItem {
  /** 토스트 구분용 키 */
  key: string;
  /** 토스트 내용 */
  text: string;
  /** 토스트 지속 시간 (ms) */
  duration?: number;
}
