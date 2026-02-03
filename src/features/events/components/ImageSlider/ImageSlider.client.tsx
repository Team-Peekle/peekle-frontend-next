'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';

import { cn } from '@common/libs/utils';

import { useIsMobile } from '@common/hooks/useIsMobile';

import { Back } from '@common/components/svg/Back';
import { Default } from '@common/components/svg/Default';

import useGetEventDetail from '@features/events/hooks/queries/useGetEventDetail';

import FilePagination from './FilePagination.client';

interface ImageSliderProps {
  eventId: string;
}

const DRAG_BUFFER = 50;

const ImageSlider = ({ eventId }: ImageSliderProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  // 디테일 가져오기
  const { eventDetail } = useGetEventDetail(eventId);

  // order 오름차순으로 정렬된 이미지 배열
  const sortedImages = useMemo(
    () =>
      [...eventDetail.images]
        .filter((img) => img.imageUrl !== null)
        .sort((a, b) => a.order - b.order),
    [eventDetail.images],
  );
  const imagesLength = sortedImages.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const dragX = useMotionValue(0);

  const slideImage = (direction: number) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return 0;
      if (newIndex >= imagesLength) return imagesLength - 1;
      return newIndex;
    });
  };

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && currentIndex < imagesLength - 1) {
      slideImage(1);
    } else if (x >= DRAG_BUFFER && currentIndex > 0) {
      slideImage(-1);
    }
  };

  const hasImages = imagesLength > 0;
  const currentPage = hasImages ? currentIndex + 1 : 0;

  return (
    <section className={cn(!isMobile && 'pt-12pxr px-12pxr')}>
      <article
        className={cn(
          'relative flex w-full items-center justify-center overflow-hidden',
          isMobile ? 'h-250pxr' : 'h-400pxr rounded-10pxr',
        )}
      >
        {/* 배경 블러 */}
        {hasImages && (
          <div className="absolute inset-0 z-0">
            <Image
              className="h-full w-full object-cover blur-lg"
              fill
              src={`https://${sortedImages[currentIndex].imageUrl}`}
              alt="배경 블러"
            />
            <div className="h-full w-full bg-black/30" />
          </div>
        )}

        {/* 2. 컨텐츠 레이어 (슬라이더 vs NotFound) */}
        <motion.div
          className={cn(
            'z-10 flex h-full w-full items-center justify-center overflow-hidden',
            !hasImages && 'bg-gray-900',
          )}
        >
          {hasImages ? (
            <motion.div
              className="flex h-full"
              style={{
                width: `${imagesLength * 100}%`,
                x: dragX,
                display: 'flex',
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              animate={{
                translateX: `-${currentIndex * 100}%`,
              }}
              transition={{ duration: 0.2 }}
              onDragEnd={onDragEnd}
            >
              {sortedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative flex w-full shrink-0 items-center justify-center"
                >
                  <Image
                    className="h-full w-full object-contain"
                    fill
                    src={`https://${image.imageUrl}`}
                    alt={`${eventDetail.title}-이미지-${index}`}
                    draggable={false}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <Default className="w-100pxr h-70pxr bg-gray-900" />
          )}
        </motion.div>

        {/* 오버레이 */}
        {hasImages && (
          <div className="bg-image-overlay pointer-events-none absolute inset-0 z-10" />
        )}
        {/* back 버튼 */}
        {isMobile && (
          <Back
            onClick={() => router.back()}
            className="text-gray-0 top-16pxr left-16pxr color-gray-0 w-18pxr h-18pxr absolute z-20 cursor-pointer"
          />
        )}
        {/* 페이지네이션 버튼 */}
        {hasImages && (
          <div className="absolute right-4 bottom-4 z-20">
            <FilePagination
              fileLength={imagesLength}
              currentPage={currentPage}
              onPrevPage={() => slideImage(-1)}
              onNextPage={() => slideImage(1)}
            />
          </div>
        )}
      </article>
    </section>
  );
};

export default ImageSlider;
