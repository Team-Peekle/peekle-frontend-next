export enum CategoryType {
  ALL = 'ALL',
  LICENSE = 'LICENSE',
  JOB_STARTUP = 'JOB_STARTUP',
  DIGITAL_SKILLS = 'DIGITAL_SKILLS',
  ECONOMY = 'ECONOMY',
  ETC = 'ETC',
}

const exceptAllCategoryKeys = Object.keys(CategoryType).filter((key) => key !== 'ALL');

export const exceptAllCategoryOptions: CategoryType[] = exceptAllCategoryKeys.map(
  (key) => CategoryType[key as keyof typeof CategoryType],
);
