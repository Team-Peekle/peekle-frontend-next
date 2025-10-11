import { CategoryType } from './category';
import { LocationType } from './filter';
import { OrderType, SortType } from './sort';

// ========== 이벤트 목록 조회 ===========
/**
 * 이벤트 목록 조회 요청 함수 인자들
 *
 * @property {number} [limit] - 한 페이지에 불러올 이벤트 수
 * @property {SortType} [sort] - 이벤트를 정렬할 기준
 * @property {OrderType} [order] - 정렬 순서
 * @property {string} [cursor] - 마지막으로 본 이벤트 id
 * @property {string} [startDate] - 시작일 (YYYY-MM-DD)
 * @property {string} [endDate] - 종료일 (YYYY-MM-DD)
 * @property {boolean} [isFree] - 무료 여부
 * @property {LocationType[]} [locations] - 이벤트 활동 지역 목록
 * @property {CategoryType[]} [categories] - 이벤트 카테고리 목록
 * @property {number} [latitude] - 현재 위치의 위도
 * @property {number} [longitude] - 현재 위치의 경도
 */
export interface GetEventsParams {
  limit?: number;
  sort?: SortType;
  order?: OrderType;
  cursor?: string;
  startDate?: string;
  endDate?: string;
  isFree?: boolean;
  locations?: LocationType[];
  categories?: CategoryType[];
  latitude?: number;
  longitude?: number;
}
