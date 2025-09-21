import { forwardRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@common/constants/routes';

import { formatPeriod } from '@common/utils/dates';

import { useIsMobile } from '@common/hooks/useIsMobile';

import { Event } from '@features/events/schemas/getEventsSchema';

import { PRICE_TYPE_LABELS } from '@features/events/constansts/filter';

interface EventCardProps {
  eventData: Event;
}

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(({ eventData }, ref) => {
  const isMobile = useIsMobile();

  return (
    <div ref={ref}>
      {isMobile ? (
        <Link
          href={ROUTES.EVENTS.DETAIL(eventData.id)}
          className="p-12pxr gap-12pxr flex shrink-0 flex-row items-center"
        >
          {eventData.thumbnailUrl && (
            <div className="h-80pxr w-80pxr rounded-10pxr relative overflow-hidden">
              <Image
                // src={eventData.thumbnailUrl}
                src={'/images/signin/signin.png'}
                alt={eventData.title}
                width={80}
                height={80}
                style={{ objectFit: 'cover' }}
                className="rounded-10pxr"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="text-p14-15 text-gray-0 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
                {eventData.title}
              </div>
            </div>
          )}
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
          {eventData.thumbnailUrl && (
            <div className="h-180pxr rounded-10pxr relative w-full overflow-hidden">
              <Image
                // src={eventData.thumbnailUrl}
                src={'/images/signin/signin.png'}
                alt={eventData.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-10pxr"
              />
              <div className="bg-image-overlay absolute inset-0" />
              <div className="text-p14-15 text-gray-0 py-14pxr px-16pxr absolute top-0 left-0 text-center">
                {eventData.title}
              </div>
            </div>
          )}
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
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
