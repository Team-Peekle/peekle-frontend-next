'use client';

import Link from 'next/link';

import { ArrowLeft } from '@common/components/svg/ArrowLeft';

interface LinkButtonProps {
  label: string;
  href: string;
}
const LinkButton = ({ label, href }: LinkButtonProps) => {
  return (
    <Link href={href} className="px-12pxr py-8pxr flex items-center justify-between">
      <p className="text-p17b pb-8pxr border-b border-gray-100 text-gray-800">{label}</p>
      <ArrowLeft />
    </Link>
  );
};

export default LinkButton;
