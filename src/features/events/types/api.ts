// ========== 이벤트 목록 조회 ===========
/**
 * 이벤트 목록 조회 요청 함수 인자들
 *
 * @property {object} params - 요청 파라미터 객체
 * @property {number} [limit] - 한 페이지에 불러올 이벤트 수
 * @property {'date'} [sort] - 이벤트를 정렬할 기준
 * @property {'asc' | 'desc'} [order] - 정렬 순서
 * @property {number} [cursor] - 다음 페이지를 위한 커서
 */
export interface GetEventsParams {
  limit?: number;
  sort?: 'date';
  order?: 'asc' | 'desc';
  cursor?: string;
}
