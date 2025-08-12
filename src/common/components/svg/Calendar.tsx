import { SvgWrapper } from './SvgWrapper';

export const Calendar = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path
          d="M 9.167 11.1 L 7.278 11.1 L 7.278 12.9 L 9.167 12.9 Z M 12.944 11.1 L 11.056 11.1 L 11.056 12.9 L 12.944 12.9 Z M 16.722 11.1 L 14.833 11.1 L 14.833 12.9 L 16.722 12.9 Z M 18.611 4.8 L 17.667 4.8 L 17.667 3 L 15.778 3 L 15.778 4.8 L 8.222 4.8 L 8.222 3 L 6.333 3 L 6.333 4.8 L 5.389 4.8 C 4.341 4.8 3.509 5.61 3.509 6.6 L 3.5 19.2 C 3.5 19.677 3.699 20.135 4.053 20.473 C 4.407 20.81 4.888 21 5.389 21 L 18.611 21 C 19.65 21 20.5 20.19 20.5 19.2 L 20.5 6.6 C 20.5 5.61 19.65 4.8 18.611 4.8 Z M 18.611 19.2 L 5.389 19.2 L 5.389 9.3 L 18.611 9.3 Z"
          fill="currentColor"
        ></path>
      </svg>
    </SvgWrapper>
  );
}
