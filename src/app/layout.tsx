import type { Metadata } from 'next';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import MicrosoftClarity from '@app/metrics/MicrosoftClarity.client';

import ReactQueryProvider from './providers/ReactQueryProvider';
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
        {/* 분석 도구 */}
        <MicrosoftClarity />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <SpeedInsights />

        <div className="mx-auto w-full max-w-[1200px]">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
