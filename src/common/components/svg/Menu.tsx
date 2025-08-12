import { SvgWrapper } from './SvgWrapper';

export const MenuIcon = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <SvgWrapper {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 18.7368V20.8421H2V18.7368H22Z" fill="currentColor" />
        <path d="M22 4V6.10526H2V4H22Z" fill="currentColor" />
        <path d="M22 11V13.1053H2V11H22Z" fill="currentColor" />
      </svg>
    </SvgWrapper>
  );
}
