import type { Metadata } from 'next';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import './styles/globals.css';

export const metadata: Metadata = {
  title: '피클 – 50대의 새 출발 안내서',
  description: '재취업과 부업 시작을 위한 공공 행사·강좌를 한곳에 모아 보고 이야기 나눠요.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto w-full max-w-[1200px]">{children}</div>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
