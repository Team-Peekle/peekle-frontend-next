import type { Metadata } from 'next';
import Script from 'next/script';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import './styles/globals.css';

export const metadata: Metadata = {
  title: '피클 – 50대의 새 출발 안내서',
  description: '재취업과 부업 시작을 위한 공공 행사·강좌를 한곳에 모아 보고 이야기 나눠요.',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        {/* 페이지가 상호작용할 수 있게 된 후 ms-clarity 로드 */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "t6eclx9d7m");
          `}
        </Script>
        {/* 구글 애널리틱스 */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {/* 구글 태그매니저 */}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}

        <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
