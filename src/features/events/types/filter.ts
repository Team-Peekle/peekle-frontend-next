export enum FilterType {
  DURATION = 'duration',
  PRICE = 'price',
  LOCATION = 'locations', // 여러개 선택 가능
}

export enum DurationType {
  ALL = 'ALL',
  CUSTOM = 'CUSTOM',
  TODAY = 'TODAY',
  ONE_WEEK = 'ONE_WEEK',
  ONE_MONTH = 'ONE_MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
}

export type DateRange = [Date | null, Date | null];

export enum PriceType {
  ALL = 'ALL',
  FREE = 'FREE',
  PAID = 'PAID',
}

export enum PriceCurrency {
  KRW = 'KRW',
}

export enum LocationType {
  ALL = 'ALL',
  강남_서초_양재 = '강남,서초,양재',
  잠실_송파_강동 = '잠실,송파,강동',
  동작_관악_사당 = '동작,관악,사당',
  마포_서대문_은평 = '마포,서대문,은평',
  종로_중구_용산 = '종로,중구,용산',
  강서_금천_양천 = '강서,금천,양천',
  영등포_구로_신도림 = '영등포,구로,신도림',
  광진_성동_중랑_동대문 = '광진,성동,중랑,동대문',
}

const exceptAllLocationKeys = Object.keys(LocationType).filter((key) => key !== 'ALL');

export const exceptAllLocationOptions: LocationType[] = exceptAllLocationKeys.map(
  (key) => LocationType[key as keyof typeof LocationType],
);
