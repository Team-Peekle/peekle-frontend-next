import { ProfileVariant } from '@common/types/profile';

import { cn } from '@common/libs/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@common/components/avatar';

import { Profile as ProfileIcon } from './svg/Profile';

interface ProfileProps {
  src?: string;
  alt?: string;
  variant?: ProfileVariant;
  className?: string;
  /** 선택 상태 */
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Profile({
  src,
  alt = 'Profile',
  variant = ProfileVariant.SIZE_32,
  isSelected = false,
  onClick,
  className = '',
}: ProfileProps) {
  const getFallbackIcon = () => {
    switch (variant) {
      case ProfileVariant.SIZE_32:
        return <ProfileIcon variant={ProfileVariant.SIZE_32} className="size-32pxr" />;
      case ProfileVariant.SIZE_40:
        return <ProfileIcon variant={ProfileVariant.SIZE_40} className="size-40pxr" />;
      case ProfileVariant.SIZE_64:
        return <ProfileIcon variant={ProfileVariant.SIZE_64} className="size-64pxr" />;
      case ProfileVariant.SIZE_96:
        return <ProfileIcon variant={ProfileVariant.SIZE_64} className="size-96pxr" />;
    }
  };

  const getAvatarSize = () => {
    switch (variant) {
      case ProfileVariant.SIZE_32:
        return 'size-32pxr';
      case ProfileVariant.SIZE_40:
        return 'size-40pxr';
      case ProfileVariant.SIZE_64:
        return 'size-64pxr';
      case ProfileVariant.SIZE_96:
        return 'size-96pxr';
    }
  };

  return (
    <Avatar
      onClick={onClick}
      className={cn(
        `${getAvatarSize()} ${className}`,
        onClick && 'cursor-pointer',
        isSelected && 'ring-2 ring-gray-800 ring-offset-2',
        'bg-gray-100',
      )}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{getFallbackIcon()}</AvatarFallback>
    </Avatar>
  );
}
