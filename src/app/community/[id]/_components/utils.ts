import { type CommunityCommentDTO } from '@features/community/schema';

import { type CommentNode } from '@features/community/components/CommentCard';

export function buildCommentTree(comments: CommunityCommentDTO[]): CommentNode[] {
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

  // 최상위 부모 댓글을 찾는 함수
  const findRootParent = (node: CommentNode): CommentNode | null => {
    if (!node.parentCommentId) {
      return null;
    }
    const parentId = String(node.parentCommentId);
    if (!nodeMap.has(parentId)) {
      return null;
    }
    const parent = nodeMap.get(parentId)!;
    // 부모의 부모가 있으면 재귀적으로 찾기
    if (parent.parentCommentId) {
      return findRootParent(parent);
    }
    return parent;
  };

  nodeMap.forEach((node) => {
    if (node.parentCommentId) {
      const parentId = String(node.parentCommentId);
      if (nodeMap.has(parentId)) {
        const parent = nodeMap.get(parentId)!;
        node.depth = parent.depth + 1;
        // 최상위 부모 댓글의 이름을 저장
        const rootParent = findRootParent(node);
        node.parentDisplayName = rootParent?.displayName ?? parent.displayName;
        parent.children.push(node);
      } else {
        roots.push(node);
      }
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

