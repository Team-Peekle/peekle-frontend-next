/**
 * eventId가 숫자로 변환 가능한지 확인
 */
export function isPositiveNumber(val: string | number | bigint) {
  // Number()로 변환 가능한지 확인
  const num = Number(val);

  // 숫자로 변환되지 않거나 (isNaN), 유한한 숫자가 아닐 때 (Infinity 등) false 반환
  if (isNaN(num) || !Number.isFinite(num)) {
    return false;
  }

  // 정수인지 확인
  if (!Number.isInteger(num)) {
    return false;
  }

  // 0보다 큰지 확인
  return num > 0;
}
