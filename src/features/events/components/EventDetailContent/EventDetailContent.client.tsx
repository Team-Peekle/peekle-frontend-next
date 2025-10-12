'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@common/libs/utils';

import { formatToKST } from '@common/utils/dates';

import { useIsMobile } from '@common/hooks/useIsMobile';

import Bookmark from '@common/components/btn/Bookmark/Bookmark.client';
import Cta from '@common/components/btn/Cta/Cta.client';
import Share from '@common/components/btn/Share/Share.client';
import { ColorCalendar } from '@common/components/svg/ColorCalendar';
import { ColorMoney } from '@common/components/svg/ColorMoney';

import { DEFAULT_TEXT } from '@features/events/constants/eventDetail';

import addressFormatter from '@features/events/utils/addressFormatter';
import priceFormatter from '@features/events/utils/priceFormatter';

import useGetEventDetail from '@features/events/hooks/queries/useGetEventDetail';

import DetailRow from './DetailRow.client';

interface EventDetailContentProps {
  eventId: string;
}

const EventDetailContetnanimation = {
  initial: { opacity: 0, y: -5 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      duration: 0.8,
      bounce: 0.2,
      delay: 0.1,
    },
  },
};

const EventDetailContent = ({ eventId }: EventDetailContentProps) => {
  const isMobile = useIsMobile();
  const { eventDetail } = useGetEventDetail(eventId);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <motion.div
      initial={EventDetailContetnanimation.initial}
      animate={EventDetailContetnanimation.animate}
    >
      <section className={cn(isMobile ? 'pt-24pxr px-16pxr' : 'gap-40pxr p-24pxr flex flex-row')}>
        <div className={cn(isMobile ? 'gap-32pxr flex flex-col' : 'gap-40pxr flex flex-col')}>
          <div className="gap-20pxr flex shrink-0 flex-col">
            <span className="gap-4pxr flex flex-col">
              <p className="text-gray-500">{eventDetail.category}</p>
              <h3 className="text-h3 text-gray-800">{eventDetail.title}</h3>
            </span>
            <div className="py-20pxr gap-12pxr flex flex-col border-t border-b border-solid border-gray-100">
              <DetailRow
                label="일시"
                icon={<ColorCalendar />}
                value={formatToKST(eventDetail.startDate)}
              />
              <DetailRow
                label="비용"
                icon={<ColorMoney />}
                value={priceFormatter(eventDetail.price)}
              />
            </div>
          </div>
          {/* 버튼 영역 */}
          {isMobile && (
            <div className="gap-10pxr flex flex-col items-center">
              <Cta
                text="홈페이지 방문하기"
                href={eventDetail.link}
                target="_blank"
                rel="noopener noreferrer"
              />
              <span className="gap-10pxr flex w-full flex-row items-center">
                <div className="flex-1">
                  <Share link={currentUrl} />
                </div>
                <div className="flex-1">
                  {/* ✅ TODO: api 연결 필요 */}
                  <Bookmark isBookmarked={true} onStateChange={() => console.log('북마크 클릭')} />
                </div>
              </span>
            </div>
          )}
          {/* 상세 정보 */}
          <div className="gap-20pxr pb-36pxr bordere-gray-100 flex flex-col border-b border-solid">
            <h4 className="text-p18-20 text-gray-800">상세 정보</h4>
            <p className="text-p16m text-gray-500">{eventDetail.description ?? DEFAULT_TEXT}</p>
          </div>
          {/* 장소 정보 */}
          <div className="gap-16pxr flex flex-col">
            <h4 className="text-p18-20 text-gray-800">행사 장소</h4>
            <DetailRow label="장소" value={eventDetail.venueName} />
            <DetailRow
              label="주소"
              value={addressFormatter({
                venueRoadAddress: eventDetail.venueRoadAddress,
                venueDetailAddress: eventDetail.venueDetailAddress,
                venueJibunAddress: eventDetail.venueJibunAddress,
              })}
            />
          </div>
        </div>
        {/* 버튼 영역 */}
        {!isMobile && (
          <div className="gap-10pxr flex flex-col items-center">
            <Cta
              text="홈페이지 방문하기"
              href={eventDetail.link}
              target="_blank"
              rel="noopener noreferrer"
            />
            <span className="gap-10pxr flex w-full flex-row items-center">
              <div className="flex-1">
                <Share link={currentUrl} />
              </div>
              <div className="flex-1">
                {/* ✅ TODO: api 연결 필요 */}
                <Bookmark isBookmarked={true} onStateChange={() => console.log('북마크 클릭')} />
              </div>
            </span>
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default EventDetailContent;
