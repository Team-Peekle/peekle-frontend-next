import { DurationType, FilterType, LocationType, PriceType } from '../types/filter';

export const DEFAULT_FILTERS = {
  [FilterType.DURATION]: DurationType.ALL,
  [FilterType.PRICE]: PriceType.ALL,
  [FilterType.LOCATION]: LocationType.ALL,
};

export const FILTER_TYPE_LABELS = {
  [FilterType.DURATION]: '기간',
  [FilterType.PRICE]: '비용',
  [FilterType.LOCATION]: '지역',
};

export const DURATION_TYPE_LABELS = {
  [DurationType.ALL]: '전체',
  [DurationType.CUSTOM]: '직접입력',
  [DurationType.TODAY]: '오늘',
  [DurationType.ONE_WEEK]: '1주일',
  [DurationType.ONE_MONTH]: '1개월',
  [DurationType.THREE_MONTHS]: '3개월',
};

/**
 * 기간 값에 따른 실제 기간 계산 결과 모음
 */
export const PREDEFINED_RANGES = {
  [DurationType.ALL]: [new Date(), new Date(new Date().setFullYear(2999))],
  [DurationType.TODAY]: [new Date(), new Date()],
  [DurationType.ONE_WEEK]: [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))],
  [DurationType.ONE_MONTH]: [new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1))],
  [DurationType.THREE_MONTHS]: [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 3)),
  ],
} as const;

export const PRICE_TYPE_LABELS = {
  [PriceType.ALL]: '전체',
  [PriceType.FREE]: '무료',
  [PriceType.PAID]: '유료',
};

export const LOCATION_TYPE_LABELS = {
  [LocationType.ALL]: '전체',
  [LocationType.강남_서초_양재]: '강남 / 서초 / 양재',
  [LocationType.잠실_송파_강동]: '잠실 / 송파 /강동',
  [LocationType.동작_관악_사당]: '동작 / 관악 / 사당',
  [LocationType.마포_서대문_은평]: '마포 / 서대문 / 은평',
  [LocationType.종로_중구_용산]: '종로 / 중구 / 용산',
  [LocationType.강서_금천_양천]: '강서 / 금천 / 양천',
  [LocationType.영등포_구로_신도림]: '영등포 / 구로 / 신도림',
  [LocationType.광진_성동_중랑_동대문]: '광진 / 성동 / 중랑 / 동대문',
};
