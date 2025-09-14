export default class ApiError<T = unknown> extends Error {
  public name: string = 'ApiError';
  errorCode: string;
  reason: string;
  data: T | null;

  constructor(errorCode: string, reason: string, data: T | null = null) {
    super(`[${errorCode}] ${reason}`);
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
  }
}
