import { format, isSameDay as isSameDayFn, isValid, isWithinInterval, parse } from 'date-fns';

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

/**
 * @description Date 객체를 YYYY.MM.DD 형식으로 변환
 *
 * @param date
 * @returns 'YYYY.MM.DD' string
 */
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return format(date, 'yyyy.MM.dd');
};

/**
 * @description Date 객체를 YYYY.MM.DD (요일) 형식으로 변환
 *
 * @param date
 * @returns 'YYYY.MM.DD (요일)' string
 */
export const formatDateWithDayOfWeek = (date: Date | null) => {
  if (!date) return null;
  const dateStr = format(date, 'yyyy.MM.dd');
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' });

  return `${dateStr} (${dayOfWeek})`;
};

/**
 * @description dateString이 YYYY.MM.DD 형식인지 반환
 *
 * @param dateString
 * @returns boolean
 */
export const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}\.\d{2}\.\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // 유효한 날짜인지도 확인
  const parsedDate = parse(dateString, 'yyyy.MM.dd', new Date());
  return isValid(parsedDate);
};
