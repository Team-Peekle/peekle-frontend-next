<<<<<<< HEAD
import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "@/common/layout/Navbar";

export const metadata: Metadata = {
  title: "피클",
  description: "피클",
=======
import type { Metadata } from 'next';

import './styles/globals.css';

export const metadata: Metadata = {
  title: '피클',
  description: '액티브 시니어 커뮤니티 플랫폼',
>>>>>>> develop
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
<<<<<<< HEAD
    <html lang="en">
      <body>
        <div className="w-full max-w-[1200px] mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
=======
    <html lang="ko">
      <body className="">{children}</body>
>>>>>>> develop
    </html>
  );
};

export default RootLayout;
