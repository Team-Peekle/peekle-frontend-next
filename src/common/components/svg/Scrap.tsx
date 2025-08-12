import { SvgWrapper } from './SvgWrapper';

interface ScrapProps extends React.HTMLAttributes<HTMLElement> {
  fill?: 'outlined' | 'weight';
}

export const Scrap = ({ fill = 'outlined', ...props }: ScrapProps) => {
  return (
    <SvgWrapper {...props}>
      {fill === 'outlined' ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3H19C19.552 3 20 3.39 20 3.872V20.563C20 20.722 19.901 20.869 19.742 20.945C19.583 21.022 19.388 21.018 19.234 20.933L12 16.977L4.766 20.932C4.612 21.017 4.418 21.021 4.258 20.945C4.099 20.868 4 20.722 4 20.563V3.872C4 3.39 4.448 3 5 3ZM18 4.744H6V18.2L12 14.92L18 18.2V4.744Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4H19C19.552 4 20 4.369 20 4.823V20.588C20 20.738 19.901 20.876 19.742 20.948C19.583 21.021 19.388 21.017 19.234 20.937L12 17.201L4.766 20.936C4.612 21.016 4.418 21.02 4.258 20.948C4.099 20.875 4 20.738 4 20.588V4.823C4 4.369 4.448 4 5 4Z"
            fill="currentColor"
          />
        </svg>
      )}
    </SvgWrapper>
  );
}
