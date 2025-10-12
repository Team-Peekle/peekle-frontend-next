import { format, isSameDay as isSameDayFn, isValid, isWithinInterval, parse } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { ko } from 'date-fns/locale';

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
 * @description Date 객체를 YYYY-MM-DD 형식으로 변환
 *
 * @param date
 * @returns 'YYYY-MM=DD' string
 */
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return format(date, 'yyyy-MM-dd');
};

/**
 * @description dateString을 MM/DD (요일) 형식으로 변환
 *
 * @param dateString
 * @returns 'MM/DD (요일)' string
 */
export const formatDateWithDayOfWeek = (dateString: string) => {
  const date = new Date(dateString);
  if (!date) return null;

  const formattedDate = format(date, 'MM/dd');
  const dayOfWeek = date.toLocaleString('ko-KR', { weekday: 'short' });

  return `${formattedDate} (${dayOfWeek})`;
};

/**
 * @description dateString을 MM/DD (요일) 형식으로 변환
 *
 * @param dateString
 * @returns 'MM/DD (요일)' string
 */
export const formatPeriod = (dateStr1: string, dateStr2: string) => {
  if (!dateStr1 || !dateStr2) return null;

  const date1 = formatDateWithDayOfWeek(dateStr1);
  const date2 = formatDateWithDayOfWeek(dateStr2);

  return `${date1} - ${date2}`;
};

/**
 * @description dateString이 YYYY-MM-DD 형식인지 반환
 *
 * @param dateString
 * @returns boolean
 */
export const isValidDate = (dateString: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // 유효한 날짜인지도 확인
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate);
};

/**
 * @description UTC ISO 8601 문자열을 한국 시간(KST)으로 변환하고 . MM. DD. 오전/오후 HH:MM' 형식으로 포맷팅
 *
 * @param utcDateStr '2020-12-31T00:00:00.000Z'와 같은 UTC 문자열
 * @returns 'YYYY. MM. DD. 오전/오후 HH:MM' 형식의 한국 시간 문자열
 */
export const formatToKST = (utcDateStr: string): string => {
  if (!utcDateStr) {
    return '';
  }

  // UTC 문자열을 Date 객체로 파싱
  const date = new Date(utcDateStr);

  // KST (UTC+9) 시간대로 변환
  // 'a'는 오전/오후, 'h'는 12시간 형식 시, 'mm'은 분
  const zonedDate = toZonedTime(date, 'Asia/Seoul');
  const formatString = 'yyyy. MM. dd. a h:mm';

  // date-fns의 format 함수와 한국어 locale을 사용해 '오전'/'오후'로 포맷
  return format(zonedDate, formatString, { locale: ko });
};
