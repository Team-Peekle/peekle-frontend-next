import { SvgWrapper } from '@common/components/svg/SvgWrapper';

export function Reload(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <SvgWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
        width="14"
        height="14"
        fill="none"
        overflow="visible"
      >
        <g transform="translate(0.5, 0.5)">
          <path
            d="M 0 7 C 0 10.866 3.134 14 7 14 C 10.866 14 14 10.866 14 7 C 14 3.134 10.866 0 7 0 L 7 1.4 C 9.771 1.4 12.125 3.427 12.537 6.167 C 12.949 8.908 11.295 11.537 8.647 12.352 C 5.998 13.167 3.152 11.923 1.952 9.425 C 0.752 6.928 1.559 3.928 3.85 2.37 L 3.85 4.2 L 5.25 4.2 L 5.25 0 L 1.05 0 L 1.05 1.4 L 2.8 1.4 C 1.036 2.721 -0.002 4.796 0 7 Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    </SvgWrapper>
  );
}
