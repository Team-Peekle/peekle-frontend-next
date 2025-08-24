import { SvgWrapper } from '@common/components/svg/SvgWrapper';

export default function Kakao(props: React.HTMLAttributes<HTMLElement>) {
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
          d="M12 3C17.8 3 22.501 6.664 22.501 11.185C22.501 15.705 17.8 19.369 12.001 19.369C11.4236 19.368 10.8468 19.3312 10.274 19.259L5.86598 22.142C5.36498 22.407 5.18798 22.378 5.39398 21.729L6.28598 18.051C3.40598 16.591 1.50098 14.061 1.50098 11.185C1.50098 6.665 6.20098 3 12.001 3"
          fill="currentColor"
        />
      </svg>
    </SvgWrapper>
  );
}
