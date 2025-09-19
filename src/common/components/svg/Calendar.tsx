import { SvgWrapper } from './SvgWrapper';

interface CalendarProps extends React.HTMLAttributes<HTMLElement> {
  type?: 'small' | 'medium';
}

export const Calendar = ({ type = 'medium', ...props }: CalendarProps) => {
  return (
    <SvgWrapper {...props}>
      {type === 'small' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
          <path
            d="M 8 0 C 9.657 0 11 1.343 11 3 L 11 8 C 11 9.605 9.739 10.916 8.154 10.996 L 8 11 L 3 11 L 2.846 10.996 C 1.312 10.918 0.082 9.688 0.004 8.154 L 0 8 L 0 3 C 0 1.343 1.343 0 3 0 Z M 1.5 5.125 L 1.5 8 C 1.5 8.828 2.172 9.5 3 9.5 L 8 9.5 C 8.828 9.5 9.5 8.828 9.5 8 L 9.5 5.125 Z M 3 1.5 C 2.172 1.5 1.5 2.172 1.5 3 L 1.5 3.625 L 9.5 3.625 L 9.5 3 C 9.5 2.172 8.828 1.5 8 1.5 Z"
            fill="currentColor"
          ></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
          <path
            d="M 9.167 11.1 L 7.278 11.1 L 7.278 12.9 L 9.167 12.9 Z M 12.944 11.1 L 11.056 11.1 L 11.056 12.9 L 12.944 12.9 Z M 16.722 11.1 L 14.833 11.1 L 14.833 12.9 L 16.722 12.9 Z M 18.611 4.8 L 17.667 4.8 L 17.667 3 L 15.778 3 L 15.778 4.8 L 8.222 4.8 L 8.222 3 L 6.333 3 L 6.333 4.8 L 5.389 4.8 C 4.341 4.8 3.509 5.61 3.509 6.6 L 3.5 19.2 C 3.5 19.677 3.699 20.135 4.053 20.473 C 4.407 20.81 4.888 21 5.389 21 L 18.611 21 C 19.65 21 20.5 20.19 20.5 19.2 L 20.5 6.6 C 20.5 5.61 19.65 4.8 18.611 4.8 Z M 18.611 19.2 L 5.389 19.2 L 5.389 9.3 L 18.611 9.3 Z"
            fill="currentColor"
          ></path>
        </svg>
      )}
    </SvgWrapper>
  );
};
