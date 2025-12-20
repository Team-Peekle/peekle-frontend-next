'use client';

import { useParams } from 'next/navigation';

import { ProfileVariant } from '@common/types/profile';

import queryKeys from '@common/constants/queryKeys';

import { useIsMobile } from '@common/hooks/useIsMobile';
import { useModal } from '@common/hooks/useModal';

import Navbar from '@common/layout/Navbar.client';

import Profile from '@common/components/Profile.server';

import ArticleSection from './_components/ArticleSection';
import CommentsSection from './_components/CommentsSection';

export default function CommunityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const articleId = Array.isArray(id) ? id[0] : id;
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full flex-col">
      {!isMobile && <Navbar />}
      <main className="flex w-full flex-row items-start gap-[64px] px-[16px] pt-4">
        <section className="max-mb:hidden flex min-w-[280px] flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2.5">
            <Profile variant={ProfileVariant.SIZE_40} />
            <p className="text-p17b">피클1135</p>
          </div>
          <button className="text-p15b flex h-fit w-fit flex-row justify-items-center rounded-[8px] border-1 border-solid px-4 py-[7px]">
            글쓰기
          </button>
        </section>
        <div className="flex w-full flex-col gap-[24px]">
          <ArticleSection articleId={articleId} />
          <CommentsSection articleId={articleId} />
        </div>
      </main>
    </div>
  );
}

function ArticleSection({ articleId }: { articleId: string }) {
  const [likeError, setLikeError] = useState<string | null>(null);
  const articleQueryOptions = getCommunityArticleDetailOptions(articleId);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetCommunityArticleDetailResponseDTO>(articleQueryOptions);

  const likeMutation = useMutation({
    mutationFn: (isLiked?: boolean) =>
      isLiked ? unlikeCommunityArticle(articleId) : likeCommunityArticle(articleId),
    onSuccess: () => {
      setLikeError(null);
      refetch();
    },
    onError: (error) => {
      if (isHttpError(error) && error.response?.status === 409) {
        setLikeError('이미 좋아요한 게시글입니다.');
        refetch();
        return;
      }
      setLikeError('좋아요 처리에 실패했습니다. 다시 시도해주세요.');
    },
  });

  if (isLoading) {
    return <ArticleSectionSkeleton />;
  }

  if (isError || !article) {
    return (
      <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
        <DetailNavbar />
        <SectionError message="게시글을 불러오지 못했어요." onRetry={() => refetch()} />
      </section>
    );
  }

  const handleEditArticle = () => {
    openModal(({ isOpen, onClose }) => (
      <CommunityArticleModal
        isOpen={isOpen}
        onClose={onClose}
        communityId={article.communityId ?? '1'}
        mode="edit"
        article={article}
        onSuccess={async () => {
          await refetch();
          queryClient.invalidateQueries({
            queryKey: queryKeys.community.list(article.communityId ?? '1').queryKey,
          });
        }}
      />
    ));
  };

  const primaryImage = article.images?.[0]?.imageUrl;
  const authorName = article.isAnonymous ? '익명' : article.authorId;
  const formattedDate = format(new Date(article.createdAt), 'yyyy.MM.dd');
  const isLiked = Boolean(article.isLiked);
  const likeCount = article.likeCount ?? 0;

  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
      <DetailNavbar isOwner onEdit={handleEditArticle} />
      <div className="flex flex-col gap-[20px] border-b-1 border-gray-100 pb-8">
        <PublishInfoCard name={authorName} date={formattedDate} />
        {primaryImage && (
          <Image
            src={primaryImage}
            alt={article.title}
            width={720}
            height={420}
            className="h-auto w-full rounded-[16px] object-cover"
          />
        )}
        <div className="flex flex-col gap-[6px]">
          <h1 className="text-p20 text-gray-900">{article.title}</h1>
          <p className="text-p15 whitespace-pre-line text-gray-600">{article.content}</p>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-3 pt-[20px]">
          <ScrapButton
            isScraped={isLiked}
            likeCount={likeCount}
            disabled={likeMutation.isPending}
            onClick={() => likeMutation.mutate(isLiked)}
            aria-pressed={isLiked}
          />
          <ShareButton />
        </div>
        {likeError && <p className="text-p13 text-red-500">{likeError}</p>}
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CommentsSection({ articleId }: { articleId: string }) {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useQuery<GetCommunityArticleCommentsResponseDTO>(
    getCommunityArticleCommentsOptions(articleId, COMMENT_LIST_PARAMS),
  );

  const likeMutation = useMutation<unknown, Error, CommentNode>({
    mutationFn: (comment: CommentNode) =>
      comment.isLiked ? unlikeCommunityComment(comment.id) : likeCommunityComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.community.comments(articleId, COMMENT_LIST_PARAMS).queryKey,
      });
    },
    onError: (error, comment) => {
      if (isHttpError(error)) {
        const status = error.response?.status;
        if (status === 409) {
          console.error(
            comment.isLiked
              ? '이미 좋아요를 취소한 댓글입니다.'
              : '이미 좋아요한 댓글입니다.',
          );
        } else if (status === 404) {
          console.error(
            comment.isLiked
              ? '좋아요를 취소할 수 없습니다. 댓글이 존재하지 않습니다.'
              : '좋아요할 수 없습니다. 댓글이 존재하지 않습니다.',
          );
        } else {
          console.error(
            comment.isLiked
              ? '댓글 좋아요 취소에 실패했습니다.'
              : '댓글 좋아요 처리에 실패했습니다.',
          );
        }
        queryClient.invalidateQueries({
          queryKey: queryKeys.community.comments(articleId, COMMENT_LIST_PARAMS).queryKey,
        });
        return;
      }
      console.error('댓글 좋아요 처리에 실패했습니다.');
    },
  });

  const structuredComments = useMemo(() => buildCommentTree(comments ?? []), [comments]);

  if (isLoading) {
    return <CommentsSectionSkeleton />;
  }

  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[32px]">
      <header className="flex items-center justify-between">
        <h2 className="text-p18 text-gray-900">댓글 {comments?.length ?? 0}</h2>
      </header>
      {isError || !comments ? (
        <SectionError message="댓글을 불러오지 못했어요." onRetry={() => refetch()} />
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {structuredComments.length === 0 ? (
              <p className="text-p15 text-center text-gray-500">아직 댓글이 없습니다.</p>
            ) : (
              structuredComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onToggleLike={(target) => likeMutation.mutate(target)}
                />
              ))
            )}
          </div>
          <CommentInput articleId={articleId} listParams={COMMENT_LIST_PARAMS} />
        </>
      )}
    </section>
  );
}

function buildCommentTree(comments: CommunityCommentDTO[]): CommentNode[] {
  const anonymousNameMap = new Map<string, string>();
  let anonymousCounter = 1;

  const getDisplayName = (comment: CommunityCommentDTO) => {
    if (!comment.isAnonymous) {
      return comment.authorId;
    }

    if (!anonymousNameMap.has(comment.authorId)) {
      anonymousNameMap.set(comment.authorId, `익명${anonymousCounter}`);
      anonymousCounter += 1;
    }

    return anonymousNameMap.get(comment.authorId)!;
  };

  const nodeMap = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  comments.forEach((comment) => {
    nodeMap.set(comment.id, {
      ...comment,
      children: [],
      depth: 0,
      displayName: getDisplayName(comment),
    });
  });

  nodeMap.forEach((node) => {
    if (node.parentCommentId && nodeMap.has(node.parentCommentId)) {
      const parent = nodeMap.get(node.parentCommentId)!;
      node.depth = parent.depth + 1;
      node.parentDisplayName = parent.displayName;
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortByCreatedAt = (list: CommentNode[]): CommentNode[] =>
    list
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((item) => ({
        ...item,
        children: sortByCreatedAt(item.children),
      }));

  return sortByCreatedAt(roots);
}

function ArticleSectionSkeleton() {
  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
      <DetailNavbar />
      <div className="flex animate-pulse flex-col gap-[20px]">
        <div className="h-10 w-1/3 rounded-lg bg-gray-100" />
        <div className="h-[320px] w-full rounded-[16px] bg-gray-100" />
        <div className="flex flex-col gap-3">
          <div className="h-6 w-2/5 rounded bg-gray-100" />
          <div className="h-20 w-full rounded bg-gray-100" />
        </div>
      </div>
    </section>
  );
}

function CommentsSectionSkeleton() {
  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[24px] px-[16px] pb-[32px]">
      <div className="h-6 w-24 rounded bg-gray-100" />
      <div className="flex flex-col gap-4">
        <div className="h-20 w-full rounded-lg bg-gray-100" />
        <div className="h-20 w-full rounded-lg bg-gray-100" />
      </div>
    </section>
  );
}

function SectionError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <p className="text-p15 text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={() => onRetry()}
          className="text-p15b rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
