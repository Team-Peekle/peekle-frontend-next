import Image from 'next/image';

import { Comment } from '@common/components/svg/Comment';
import { HeartIcon } from '@common/components/svg/Heart';

type CommunityResponse = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  like: number;
  comment: number;
  isLiked: boolean;
  date: string;
};

interface CommunityCardProps {
  post: CommunityResponse;
  onClick?: () => void;
  onLikeClick?: (id: number) => void;
}

export function CommunityCard({ post, onClick, onLikeClick }: CommunityCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(post.id);
  };

  return (
    <article
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-b-1 border-black/5 pb-[24px]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-p17b text-gray-900">{post.title}</h3>
        <p className="text-p16m line-clamp-8 text-gray-600">{post.content}</p>
      </div>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
          className="rounded-[8px] object-cover"
          alt={post.title}
          width={254}
          height={156}
          style={{
            width: '254px',
            height: '156px',
          }}
        />
      )}
      <div className="text-p15m flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1 ${
              post.isLiked ? 'text-semantic-red' : 'text-gray-400'
            } hover:text-semantic-red transition-colors`}
          >
            <HeartIcon className="h-[15px] w-[17px]" />
            <span>{post.like}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-400">
            <Comment className="h-[17px] w-[18px]" />
            <span>{post.comment}</span>
          </div>
        </div>
        <span className="text-gray-400">{post.date}</span>
      </div>
    </article>
  );
}
