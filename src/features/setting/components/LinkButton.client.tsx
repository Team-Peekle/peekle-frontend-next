'use client';

import Link from 'next/link';

import { Arrow } from '@common/components/svg/Arrow';

interface LinkButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}
const LinkButton = ({ label, href, onClick }: LinkButtonProps) => {
  const baseClass = `rounded-10pxr px-12pxr py-8pxr bg-gray-0 flex items-center justify-between hover:bg-gray-100 w-full transition-colors`;

  const Content = (
    <>
      <p className="text-p16sb text-gray-700">{label}</p>
      <Arrow direction="right" className="w-13pxr h-14pxr text-gray-300" />
    </>
  );

  // href가 있으면 Link, 없으면 button 렌더링
  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {Content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClass}>
      {Content}
    </button>
  );
};

export default LinkButton;
