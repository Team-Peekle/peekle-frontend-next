import type { Metadata } from 'next';

import Navbar from '@/common/layout/Navbar';

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
        <div className="mx-auto w-full max-w-[1200px]">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
