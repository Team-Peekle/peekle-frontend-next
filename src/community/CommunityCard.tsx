import Image from 'next/image';

import { Comment } from '@common/components/svg/Comment';
import { Heart } from '@common/components/svg/Heart';

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
      className="flex cursor-pointer flex-col gap-4 rounded-lg border-b border-black/5 pb-6"
      onClick={onClick}
    >
      <h3 className="text-p17b text-gray-900">{post.title}</h3>
      <p className="text-p16m line-clamp-8 text-gray-600">{post.content}</p>
      {post.imageUrl && (
        <Image
          src={post.imageUrl}
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
            className={`text-p15 flex items-center gap-1 ${
              post.isLiked ? 'text-red-500' : 'text-gray-500'
            } transition-colors hover:text-red-500`}
          >
            <Heart className="h-4 w-4" />
            <span>{post.like}</span>
          </button>
          <div className="text-p15 flex items-center gap-1 text-gray-500">
            <Comment className="h-4 w-4" />
            <span>{post.comment}</span>
          </div>
        </div>
        <span className="text-p13 text-gray-400">{post.date}</span>
      </div>
    </article>
  );
}
