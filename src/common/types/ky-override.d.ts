declare module 'ky' {
  type Primitive = string | number | boolean;
  type SearchParamsValue = Primitive | undefined | Primitive[];

  type SearchParamsOption =
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
    | Record<string, SearchParamsValue | primitive[]> // 배열 타입을 허용
    | Array<Array<Primitive>>;
}

// 타입스크립트가 이 파일을 모듈로 인식하도록 빈 export를 추가
export {};
