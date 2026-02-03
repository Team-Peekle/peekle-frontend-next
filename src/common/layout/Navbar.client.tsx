'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { ProfileVariant } from '@common/types/profile';
import { PageContextType } from '@common/types/routes';

import { PAGE_CONTEXT_LABELS, ROUTES } from '@common/constants/routes';

import useIsCommunityPage from '@common/hooks/queries/useIsCommunityPage';

import { loginStore } from '@common/stores/loginStore';

import UserProfile from '@common/components/UserProfile.client';
import ModalLayout from '@common/components/modal/ModalLayout.client';

import { Close } from '@/common/components/svg/Close';
import { MenuIcon } from '@/common/components/svg/Menu';
import PeekleLogo from '@/common/components/svg/PeekleLogo';
import { Search } from '@/common/components/svg/Search';
import { useIsMobile } from '@/common/hooks/useIsMobile';
import { useIsScrolled } from '@/common/hooks/useIsScrolled';

const menuVariants = {
  // 초기 상태: 네비게이션바 높이 (64px)만큼 위에서 시작
  initial: { opacity: 0, y: -8 },
  // 진입 상태: 최종 위치 (y: 0)
  animate: { opacity: 1, y: 0 },
  // 퇴장 상태: 다시 위로 미끄러져 올라가면서 사라짐
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};
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
  const router = useRouter();
  const isCommunityPage = useIsCommunityPage();
  const { isLoggedIn, checkLoginStatus } = loginStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const currentContext = isCommunityPage ? PageContextType.COMMUNITY : PageContextType.EVENT;

  const menuItems = [
    { label: '이벤트', href: ROUTES.ROOT },
    { label: '커뮤니티', href: ROUTES.COMMUNITY },
    {
      label: isLoggedIn ? '내정보' : '회원가입/로그인',
      href: isLoggedIn ? ROUTES.SETTING : ROUTES.SIGN_IN,
    },
  ];

  return (
    <div className="relative z-30">
      <nav className="py-10pxr pl-16pxr pr-4pxr bg-gray-0 max-w-799pxr h-64pxr flex w-full flex-row items-center justify-between">
        <div className="gap-12pxr flex flex-row items-center">
          <PeekleLogo
            className="w-82pxr cursor-pointer text-gray-900"
            onClick={() => router.push(ROUTES.ROOT)}
          />
          <p className="text-p16b">{PAGE_CONTEXT_LABELS[currentContext]}</p>
        </div>
        <div className="flex flex-row">
          <Link
            href={{
              pathname: ROUTES.SEARCH,
              query: { context: currentContext },
            }}
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

      {isMenuOpen && (
        <ModalLayout isCenter={false} onClickDimmed={() => setIsMenuOpen(false)}>
          <motion.div
            variants={menuVariants} // y: -8 -> 0 애니메이션
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            // Nav의 높이 아래 (64px)에서 시작하도록 fixed 위치 지정
            className={`bg-gray-0 fixed top-[64px] left-0 z-40 w-full`}
            onClick={(e) => e.stopPropagation()} // 메뉴 내부 클릭 시 닫힘 방지
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="p-16pxr text-p16sb flex w-full items-center justify-start transition-colors duration-200 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)} // 메뉴 항목 클릭 시 닫기
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        </ModalLayout>
      )}
    </div>
  );
};

Navbar.Web = function NavbarWeb() {
  const router = useRouter();
  const isCommunityPage = useIsCommunityPage();
  const { isLoggedIn, checkLoginStatus } = loginStore();

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const currentContext = isCommunityPage ? PageContextType.COMMUNITY : PageContextType.EVENT;

  return (
    <nav className="min-w-800pxr h-64pxr bg-gray-0 px-16pxr flex w-full flex-row items-center justify-between">
      <div className="gap-32pxr flex flex-row items-center">
        <PeekleLogo
          className="w-82pxr cursor-pointer text-gray-900"
          onClick={() => router.push(ROUTES.ROOT)}
        />{' '}
        <div className="gap-24pxr text-16b flex flex-row">
          <Link
            href={ROUTES.ROOT}
            className={currentContext === PageContextType.EVENT ? 'text-black' : 'text-gray-200'}
          >
            {PAGE_CONTEXT_LABELS[PageContextType.EVENT]}
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className={
              currentContext === PageContextType.COMMUNITY ? 'text-black' : 'text-gray-200'
            }
          >
            {PAGE_CONTEXT_LABELS[PageContextType.COMMUNITY]}
          </Link>
        </div>
      </div>
      <div className="gap-16pxr flex flex-row items-center">
        <Link
          href={{
            pathname: ROUTES.SEARCH,
            query: { context: currentContext },
          }}
          className="size-40pxr flex cursor-pointer items-center justify-center"
        >
          <Search className="size-20pxr text-gray-600" />
        </Link>
        {isLoggedIn ? (
          <UserProfile
            variant={ProfileVariant.SIZE_32}
            onClick={() => router.push(ROUTES.SETTING)}
          />
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
