import { isWithinInterval } from 'date-fns';
import { isSameDay as isSameDayFn } from 'date-fns';

/**
 * @description 날짜가 특정 범위에 속하는지 확인
 *
 * @param date 확인할 날짜
 * @param start 범위 시작 날짜
 * @param end 범위 종료 날짜
 * @returns 범위 내에 있으면 true, 아니면 false
 */
export const isInRange = (date: Date | null, start: Date | null, end: Date | null): boolean => {
  if (!date || !start || !end) return false;
  return isWithinInterval(date, { start, end });
};

/**
 * @description 두 날짜가 같은 날인지 확인
 *
 * @param date1
 * @param date2
 * @returns 같으면 true, 아니면 false
 */
export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return isSameDayFn(date1, date2);
};
