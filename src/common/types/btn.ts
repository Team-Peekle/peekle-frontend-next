import { ButtonHTMLAttributes } from 'react';

/**
 * @description 버튼 공통 타입
 *
 * interface declaring no members 오류 없애려고 disabled만 추가해 놓음
 */
export interface ButtonsCommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

/**
 * @description write 버튼에서 쓰이는 종류
 */
export enum WriteType {
  V1 = 'V1',
  V2 = 'V2',
}

/**
 * @description ScrapLine 버튼에서 쓰이는 색 종류
 */
export enum ScrapLineColorType {
  WHITE = 'WHITE',
  GRAY = 'GRAY',
}
