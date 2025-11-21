import { useMutation, useQueryClient } from '@tanstack/react-query';

import queryKeys from '@common/constants/queryKeys';

import cancleScrapEvent from '../apis/delete/cancleScrapEvent';
import scrapEvent from '../apis/post/scrapEvent';
import { EventDetail } from '../schemas/getEventDetailSchema';

/**
 * 이벤트를 스크랩하거나 취소하는 훅
 * @param eventId - 대상 이벤트 ID
 */
export default function useScrapEvent(eventId: string) {
  const qc = useQueryClient();
  const detailKey = queryKeys.events.detail(eventId).queryKey;

  // 현재 상태(isScrap)를 받아서 API를 분기
  return useMutation({
    mutationKey: queryKeys.events.scrap(eventId).queryKey,

    mutationFn: (isScrap: boolean) => {
      if (isScrap) {
        return cancleScrapEvent(eventId); // 이미 스크랩 중이면 -> 취소 API
      } else {
        return scrapEvent(eventId); // 스크랩 아니면 -> 찜하기 API
      }
    },

    // 낙관적 업데이트
    onMutate: async (isScrap) => {
      // 진행 중인 쿼리 취소 (덮어쓰기 방지)
      await qc.cancelQueries({ queryKey: detailKey });
      // 이전 데이터 스냅샷 (롤백용)
      const prev = qc.getQueryData<EventDetail>(detailKey);

      // 캐시 강제 업데이트
      if (prev) {
        qc.setQueryData<EventDetail>(detailKey, {
          ...prev,
          isScrapped: !isScrap, // 현재 상태 반대로 뒤집기 (True -> False, False -> True)
        });
      }

      // 롤백용 컨텍스트 반환 (onError에서 사용)
      return { prev };
    },

    // 에러 발생 시 롤백
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        qc.setQueryData(detailKey, context.prev);
      }
    },

    // 성공/실패 관계없이 최신 데이터 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: detailKey });
    },
  });
}
