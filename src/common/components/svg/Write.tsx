import { SvgWrapper } from './SvgWrapper';

export const Write = (props: React.HTMLAttributes<HTMLElement>) => {
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
          d="M13.416 6.335L17.665 10.584L7.749 20.5H3.5V16.25L13.416 6.335ZM14.832 4.918L16.956 2.793C17.144 2.605 17.399 2.5 17.665 2.5C17.93 2.5 18.185 2.605 18.373 2.793L21.206 5.626C21.299 5.719 21.373 5.829 21.424 5.951C21.474 6.073 21.5 6.203 21.5 6.335C21.5 6.466 21.474 6.596 21.424 6.718C21.373 6.84 21.299 6.95 21.206 7.043L19.081 9.168L14.832 4.918Z"
          fill="currentColor"
        />
      </svg>
    </SvgWrapper>
  );
}
