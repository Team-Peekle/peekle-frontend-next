'use client';

import { forwardRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { ROUTES } from '@common/constants/routes';

import { cn } from '@common/libs/utils';

import { formatPeriod } from '@common/utils/dates';

import { useIsMobile } from '@common/hooks/useIsMobile';

import { Default } from '@common/components/svg/Default';

import { Event } from '@features/events/schemas/getEventsSchema';

import { PRICE_TYPE_LABELS } from '@features/events/constansts/filter';

interface EventCardProps {
  eventData: Event;
  isFirstPage: boolean;
}

const EventCardAnimation = {
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

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(({ eventData, isFirstPage }, ref) => {
  const isMobile = useIsMobile();
  // 첫번째 카드일 때만 애니메이션 적용
  const MotionComponent = isFirstPage ? motion.div : 'div';
  const animationProps = isFirstPage
    ? {
        initial: EventCardAnimation.initial,
        animate: EventCardAnimation.animate,
      }
    : {};

  const region = eventData.region;
  const imgUrl = eventData.thumbnailUrl;

  return (
    <MotionComponent
      ref={ref}
      {...animationProps} // isFirstPage 때만 애니메이션 props 전달
    >
      {isMobile ? (
        <Link
          href={ROUTES.EVENTS.DETAIL(eventData.id)}
          className="p-12pxr gap-12pxr flex shrink-0 flex-row items-center"
        >
          <div
            className={cn(
              'h-80pxr w-80pxr rounded-10pxr relative flex shrink-0 items-center justify-center overflow-hidden',
              !imgUrl && 'bg-gray-900', // 이미지 주소 럾으면 배경 검정으로 만들기
            )}
          >
            {eventData.thumbnailUrl ? (
              <>
                {/* 1. 이미지가 있는 경우: 이미지 렌더링 */}
                <Image
                  src={eventData.thumbnailUrl}
                  alt={`${eventData.title} 이미지`}
                  fill
                  className="rounded-10pxr object-cover"
                />
                {/* 2. 이미지가 있고 + 지역 정보도 있는 경우: 오버레이(배경+텍스트) 표시 */}
                {region && (
                  <>
                    <motion.div
                      // initial={{ opacity: 0 }}
                      // animate={{ opacity: 1 }}
                      // whileHover={{ scale: 0.5 }}
                      className="absolute inset-0 bg-black/50"
                    />
                    <div className="text-p14-15 text-gray-0 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center whitespace-nowrap">
                      {eventData.region}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* 3. 이미지가 없는 경우: 기본 이미지 표시 */
              <Default className="w-66pxr h-45pxr" />
            )}
          </div>
          <div>
            <p className="text-p14-16 text-gray-400">{eventData.category}</p>
            <h3 className="text-p16-18 mb-6pxr text-gray-700">{eventData.title}</h3>
            <span className="gap-8pxr text-p14-15 flex flex-row items-center text-gray-400">
              <p>{formatPeriod(eventData.period.start, eventData.period.end)}</p>
              <div className="w-1pxr h-10pxr bg-gray-300" />
              <p>{PRICE_TYPE_LABELS[eventData.price.type]}</p>
            </span>
          </div>
        </Link>
      ) : (
        <Link
          href={ROUTES.EVENTS.DETAIL(eventData.id)}
          className="p-12pxr gap-12pxr flex shrink-0 flex-col"
        >
          <div
            className={cn(
              'h-180pxr rounded-10pxr relative flex w-full shrink-0 items-center justify-center overflow-hidden object-cover',
              !imgUrl && 'bg-gray-900',
            )}
          >
            {eventData.thumbnailUrl ? (
              <>
                <Image
                  src={eventData.thumbnailUrl}
                  alt={`${eventData.title} 이미지`}
                  fill
                  className="rounded-10pxr object-cover"
                />
                {region && (
                  <>
                    <div className="bg-image-overlay absolute inset-0 filter" />
                    <div className="text-p14-15 text-gray-0 py-14pxr px-16pxr absolute top-0 left-0 text-center whitespace-nowrap">
                      {/* {eventData.region} */}
                      지역
                    </div>
                  </>
                )}
              </>
            ) : (
              <Default className="w-150pxr h-100pxr" />
            )}
          </div>
          <div>
            <p className="text-p14-16 text-gray-400">{eventData.category}</p>
            <h3 className="text-p16-18 mb-6pxr text-gray-700">{eventData.title}</h3>
            <span className="gap-8pxr text-p14-15 flex flex-row items-center text-gray-400">
              <p>{formatPeriod(eventData.period.start, eventData.period.end)}</p>
              <div className="w-1pxr h-10pxr bg-gray-300" />
              <p>{PRICE_TYPE_LABELS[eventData.price.type]}</p>
            </span>
          </div>
        </Link>
      )}
    </MotionComponent>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
