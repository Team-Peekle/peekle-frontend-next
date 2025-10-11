export enum CategoryType {
  ALL = 'ALL',
  LICENSE = '자격증',
  JOB_STARTUP = '취·창업',
  DIGITAL_SKILLS = '디지털 역량',
  ECONOMY = '경제',
  ETC = '기타',
}

const exceptAllCategoryKeys = Object.keys(CategoryType).filter((key) => key !== 'ALL');

export const exceptAllCategoryOptions: CategoryType[] = exceptAllCategoryKeys.map(
  (key) => CategoryType[key as keyof typeof CategoryType],
);
