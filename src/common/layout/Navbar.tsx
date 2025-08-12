"use client";

import Profile from "@/common/components/Profile";
import { Close } from "@/common/components/svg/Close";
import { MenuIcon } from "@/common/components/svg/Menu";
import PeekleLogo from "@/common/components/svg/PeekleLogo";
import { Search } from "@/common/components/svg/Search";
import { useIsMobile } from "@/common/hooks/useIsMobile";
import { useIsScrolled } from "@/common/hooks/useIsScrolled";
import { loginStore } from "@/common/store/loginStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const isMobile = useIsMobile();
  const isScrolled = useIsScrolled();

  return (
    <div
      className={`w-full h-fit${isScrolled ? "border-b border-gray-100" : ""}`}
    >
      {isMobile ? <Navbar.Mobile /> : <Navbar.Web />}
    </div>
  );
}

Navbar.Mobile = function NavbarMobile() {
  let pathname = usePathname();
  if (!pathname) pathname = "/";
  const { isLoggedIn } = loginStore();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const route = pathname.startsWith("/event") ? "이벤트" : "커뮤니티";

  const menuItems = [
    { label: "이벤트", href: "/event" },
    { label: "커뮤니티", href: "/community" },
    {
      label: isLoggedIn ? "내정보" : "회원가입/로그인",
      href: isLoggedIn ? "/my" : "/login",
    },
  ];

  return (
    <div className="relative">
      <nav className="w-full py-10pxr pl-16pxr pr-4pxr bg-gray-0 max-w-799pxr h-64pxr flex flex-row items-center justify-between">
        <div className="gap-12pxr flex flex-row items-center">
          <PeekleLogo className="w-82pxr" />
          <p className="text-p16b">{route}</p>
        </div>
        <div className="flex flex-row">
          <Link
            href={"/search"}
            className="size-44pxr flex items-center justify-center cursor-pointer"
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
        className={`absolute top-full left-0 w-full bg-gray-0 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform -translate-y-2 pointer-events-none"
        }`}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="p-16pxr flex items-center justify-start w-full text-p16sb hover:bg-gray-50 transition-colors duration-200"
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
  if (!pathname) pathname = "/"; // 스토리보드용 코드
  const { isLoggedIn } = loginStore();

  return (
    <nav className="w-full min-w-800pxr h-64pxr bg-gray-0 px-16pxr flex flex-row items-center justify-between">
      <div className="flex flex-row gap-32pxr items-center">
        <PeekleLogo className="w-82pxr" />
        <div className="flex flex-row gap-24pxr text-16b">
          <Link
            href="/event"
            className={
              pathname.startsWith("/event") ? "text-black" : "text-gray-200"
            }
          >
            이벤트
          </Link>
          <Link
            href="/community"
            className={
              pathname.startsWith("/community") ? "text-black" : "text-gray-200"
            }
          >
            커뮤니티
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-16pxr items-center">
        <Link
          href="/search"
          className="size-40pxr flex items-center justify-center cursor-pointer"
        >
          <Search className="size-20pxr text-gray-600" />
        </Link>
        {isLoggedIn ? (
          <Profile variant="size-32" />
        ) : (
          <Link
            href={"/login"}
            className="w-fit h-fit px-16pxr pt-8pxr pb-7pxr rounded-8pxr bg-gray-0 text-primary-500 text-p14 border border-gray-200"
          >
            회원가입/로그인
          </Link>
        )}
      </div>
    </nav>
  );
};
