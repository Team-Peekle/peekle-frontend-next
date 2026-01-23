export default class ApiError<T = unknown> extends Error {
  public name: string = 'ApiError';
  errorCode: string;
  reason: string;
  data: T | null;

  constructor(errorCode: string, reason: string, data: T | null = null) {
    super(reason);
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;

    // 프로토타입 체인 복구
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
