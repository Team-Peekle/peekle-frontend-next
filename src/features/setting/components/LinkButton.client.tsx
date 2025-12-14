'use client';

import Link from 'next/link';

import { Arrow } from '@common/components/svg/Arrow';

interface LinkButtonProps {
  label: string;
  href: string;
}
const LinkButton = ({ label, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="rounded-10pxr px-12pxr py-8pxr bg-gray-0 flex items-center justify-between hover:bg-gray-100"
    >
      <p className="text-p16sb text-gray-700">{label}</p>
      <Arrow direction="right" className="w-13pxr h-14pxr text-gray-300" />
    </Link>
  );
};

export default LinkButton;
