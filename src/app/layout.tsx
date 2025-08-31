import type { Metadata } from 'next';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import './styles/globals.css';

export const metadata: Metadata = {
  title: '피클',
  description: '피클',
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
