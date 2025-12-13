export interface SearchParamsType {
  [key: string]: string | string[] | undefined;
}

export enum PageContextType {
  EVENT = 'event',
  COMMUNITY = 'community',
}
