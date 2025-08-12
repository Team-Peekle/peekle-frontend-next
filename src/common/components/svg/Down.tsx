import { SvgWrapper } from './SvgWrapper';

export const Down = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.136 13.233L17.192 8.779L18.636 10.052L12.136 15.779L5.63599 10.052L7.07999 8.78L12.136 13.234V13.233Z"
          fill="currentColor"
        />
      </svg>
    </SvgWrapper>
  );
}
