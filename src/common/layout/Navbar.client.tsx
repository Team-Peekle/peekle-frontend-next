'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import { ROUTES } from '@common/constants/routes';

import { loginStore } from '@common/stores/loginStore';

import UserProfile from '@common/components/UserProfile.client';

import { Close } from '@/common/components/svg/Close';
import { MenuIcon } from '@/common/components/svg/Menu';
import PeekleLogo from '@/common/components/svg/PeekleLogo';
import { Search } from '@/common/components/svg/Search';
import { useIsMobile } from '@/common/hooks/useIsMobile';
import { useIsScrolled } from '@/common/hooks/useIsScrolled';

export default function Navbar() {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  return (
    <div className={`w-full h-fit${isScrolled ? 'border-b border-gray-100' : ''}`}>
      {isMobile ? <Navbar.Mobile /> : <Navbar.Web />}
    </div>
  );
}

Navbar.Mobile = function NavbarMobile() {
  let pathname = usePathname();
  if (!pathname) pathname = '/';
  const { isLoggedIn, checkLoginStatus } = loginStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const route = pathname.startsWith(ROUTES.ROOT) ? '이벤트' : '커뮤니티';

  const menuItems = [
    { label: '이벤트', href: ROUTES.ROOT },
    { label: '커뮤니티', href: ROUTES.COMMUNITY },
    {
      label: isLoggedIn ? '내정보' : '회원가입/로그인',
      href: isLoggedIn ? ROUTES.MY : ROUTES.SIGN_IN,
    },
  ];

  return (
    <div className="relative">
      <nav className="py-10pxr pl-16pxr pr-4pxr bg-gray-0 max-w-799pxr h-64pxr flex w-full flex-row items-center justify-between">
        <div className="gap-12pxr flex flex-row items-center">
          <PeekleLogo className="w-82pxr" />
          <p className="text-p16b">{route}</p>
        </div>
        <div className="flex flex-row">
          <Link
            href={ROUTES.SEARCH}
            className="size-44pxr flex cursor-pointer items-center justify-center"
          >
            <Search className="size-20pxr text-gray-600" />
          </Link>
          <button
            className="size-44pxr flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <Close className="size-20pxr text-gray-600" />
            ) : (
              <MenuIcon className="size-20pxr text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`bg-gray-0 absolute top-full left-0 z-10 w-full transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'translate-y-0 transform opacity-100'
            : 'pointer-events-none -translate-y-2 transform opacity-0'
        }`}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="p-16pxr text-p16sb flex w-full items-center justify-start transition-colors duration-200 hover:bg-gray-50"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

Navbar.Web = function NavbarWeb() {
  let pathname = usePathname();
  if (!pathname) pathname = ROUTES.ROOT;
  const { isLoggedIn, checkLoginStatus } = loginStore();

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <nav className="min-w-800pxr h-64pxr bg-gray-0 px-16pxr flex w-full flex-row items-center justify-between">
      <div className="gap-32pxr flex flex-row items-center">
        <PeekleLogo className="w-82pxr" />
        <div className="gap-24pxr text-16b flex flex-row">
          <Link
            href={ROUTES.ROOT}
            className={pathname.startsWith(ROUTES.ROOT) ? 'text-black' : 'text-gray-200'}
          >
            이벤트
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className={pathname.startsWith(ROUTES.COMMUNITY) ? 'text-black' : 'text-gray-200'}
          >
            커뮤니티
          </Link>
        </div>
      </div>
      <div className="gap-16pxr flex flex-row items-center">
        <Link
          href={ROUTES.SEARCH}
          className="size-40pxr flex cursor-pointer items-center justify-center"
        >
          <Search className="size-20pxr text-gray-600" />
        </Link>
        {isLoggedIn ? (
          <UserProfile variant={ProfileVariant.SIZE_32} />
        ) : (
          <Link
            href={ROUTES.SIGN_IN}
            className="px-16pxr pt-8pxr pb-8pxr rounded-8pxr bg-gray-0 text-primary-500 text-p14 h-fit w-fit border border-gray-200"
          >
            회원가입/로그인
          </Link>
        )}
      </div>
    </nav>
  );
};
