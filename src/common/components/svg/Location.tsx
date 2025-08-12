import { SvgWrapper } from './SvgWrapper';

export const Location = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path
          d="M 12 2.5 C 7.8 2.5 4 5.446 4 10.001 C 4 12.91 6.45 16.331 11.34 20.274 C 11.72 20.575 12.29 20.575 12.67 20.274 C 17.55 16.331 20 12.91 20 10.001 C 20 5.446 16.2 2.5 12 2.5 Z M 12 11.647 C 10.9 11.647 10 10.824 10 9.818 C 10 8.812 10.9 7.989 12 7.989 C 13.1 7.989 14 8.812 14 9.818 C 14 10.824 13.1 11.647 12 11.647 Z"
          fill="currentColor"
        ></path>
      </svg>
    </SvgWrapper>
  );
}
