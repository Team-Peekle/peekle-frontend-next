import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Profile as ProfileIcon, ProfileVariant } from './svg/Profile';

interface ProfileProps {
  src?: string;
  alt?: string;
  variant?: 'size-32' | 'size-40' | 'size-64';
  className?: string;
}

export default function Profile({
  src,
  alt = 'Profile',
  variant = 'size-32',
  className = '',
}: ProfileProps) {
  const getFallbackIcon = () => {
    switch (variant) {
      case 'size-32':
        return <ProfileIcon variant={ProfileVariant.SIZE_32} className="size-32pxr" />;
      case 'size-40':
        return <ProfileIcon variant={ProfileVariant.SIZE_40} className="size-40pxr" />;
      case 'size-64':
        return <ProfileIcon variant={ProfileVariant.SIZE_64} className="size-64pxr" />;
    }
  };

  const getAvatarSize = () => {
    switch (variant) {
      case 'size-32':
        return 'size-32pxr';
      case 'size-40':
        return 'size-40pxr';
      case 'size-64':
        return 'size-64pxr';
    }
  };

  return (
    <Avatar className={`${getAvatarSize()} ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-gray-100">{getFallbackIcon()}</AvatarFallback>
    </Avatar>
  );
}
