import Image from 'next/image';

import { Comment } from '@common/components/svg/Comment';
import { HeartIcon } from '@common/components/svg/Heart';

type CommunityCardPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  images?: { imageUrl: string; order: number }[];
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  formattedDate?: string;
};

interface CommunityCardProps {
  post: CommunityCardPost;
  onClick?: () => void;
  onLikeClick?: (id: string, isLiked?: boolean) => void;
  isLikeLoading?: boolean;
}

export function CommunityCard({ post, onClick, onLikeClick, isLikeLoading }: CommunityCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(post.id, post.isLiked);
  };

  const imageUrl = post.images?.[0]?.imageUrl;
  const isValidImageUrl =
    imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '' && imageUrl !== 'undefined';
  const likeCount = post.likeCount ?? 0;
  const commentCount = post.commentCount ?? 0;
  const displayDate = post.formattedDate ?? post.createdAt;
  const isLiked = Boolean(post.isLiked);

  return (
    <article
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-b border-black/5 pb-6"
      onClick={onClick}
    >
      <h3 className="text-p17b text-gray-900">{post.title}</h3>
      <p className="text-p16m line-clamp-8 text-gray-600">{post.content}</p>
      {isValidImageUrl && imageUrl && (
        <Image
          src={imageUrl}
          className="rounded-lg object-cover"
          alt={post.title}
          width={254}
          height={156}
          style={{
            width: '254px',
            height: '156px',
          }}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeClick}
            type="button"
            disabled={isLikeLoading}
            aria-pressed={isLiked}
            className={`text-p15 flex items-center gap-1 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <HeartIcon className="h-4 w-4" fill={isLiked ? 'weight' : 'outlined'} />
            <span>{likeCount}</span>
          </button>
          <div className="text-p15 flex items-center gap-1 text-gray-500">
            <Comment className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
        </div>
        <span className="text-p13 text-gray-400">{displayDate}</span>
      </div>
    </article>
  );
}
