import Footer from './Footer/Footer.client';

interface DefaultLayoutProps {
  navComponent: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 네비게이션 바와 콘텐츠 영역, 푸터를 포함하는 레이아웃 컴포넌트입니다.
 *
 * 이 컴포넌트는 전체 화면을 차지하며, 상단에 네비게이션 컴포넌트를 렌더링하고,
 * 그 아래에 자식 요소(children), 푸터를 렌더링하여 페이지 레이아웃을 구성합니다.
 *
 * @param {object} props
 * @param {React.ReactNode} props.navComponent - 레이아웃 상단에 렌더링될 네비게이션 컴포넌트
 * @param {React.ReactNode} props.children - 네비게이션 바 아래에 렌더링될 페이지 본문 콘텐츠
 * @returns {JSX.Element} 레이아웃 UI
 */
const DefaultLayout = ({ navComponent, children }: DefaultLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col">
      {navComponent}
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default DefaultLayout;
