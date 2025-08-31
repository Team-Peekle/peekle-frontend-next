import { cn } from '@lib/utils';

import { ProfileVariant } from '@common/types/profile';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Profile as ProfileIcon } from './svg/Profile';

interface ProfileProps {
  src?: string;
  alt?: string;
  variant?: 'size-32' | 'size-40' | 'size-64' | 'size-96';
  className?: string;
  /** 선택 상태 */
  isSelected?: boolean;
  onClick?: () => void;
}

export default function Profile({
  src,
  alt = 'Profile',
  variant = 'size-32',
  isSelected = false,
  onClick,
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
      case 'size-96':
        return <ProfileIcon variant={ProfileVariant.SIZE_64} className="size-96pxr" />;
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
      case 'size-96':
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
      )}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="bg-gray-100">{getFallbackIcon()}</AvatarFallback>
    </Avatar>
  );
}
