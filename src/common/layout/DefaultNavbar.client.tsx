'use client';

import PeekleLogo from '@/common/components/svg/PeekleLogo';
import { useIsScrolled } from '@/common/hooks/useIsScrolled';

export default function DefaultNavbar() {
  const isScrolled = useIsScrolled();

  return (
    <nav
      className={`py-17pxr bg-gray-0 h-64pxr flex w-full flex-row items-center justify-center border-b border-gray-100 ${
        isScrolled ? 'border-b border-gray-100' : ''
      }`}
    >
      <PeekleLogo className="w-82pxr h-22pxr text-gray-900" />
    </nav>
  );
}
