import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { OverlayProvider } from 'overlay-kit';

import { cn } from '@common/libs/utils';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import MicrosoftClarity from '@app/metrics/MicrosoftClarity.client';
import ReactQueryProvider from '@app/providers/ReactQueryProvider.client';
import '@app/styles/globals.css';

export const metadata: Metadata = {
  title: '피클 – 50대의 새 출발 안내서',
  description: '재취업과 부업 시작을 위한 공공 행사·강좌를 한곳에 모아 보고 이야기 나눠요.',
};

const pretendard = localFont({
  src: '../common/assets/fonts/pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

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
        {/* 분석 도구 */}
        <MicrosoftClarity />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <SpeedInsights />

        <ReactQueryProvider>
          <OverlayProvider>
            <div className={cn('font-pretendard mx-auto w-full max-w-[1200px]', pretendard.variable)}>
              {children}
            </div>
            <div id="modal" />
            <Toaster />
          </OverlayProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
