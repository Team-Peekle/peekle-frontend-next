import { DEFAULT_TEXT } from '@features/events/constants/eventDetail';

interface AddressParams {
  venueRoadAddress?: string | null;
  venueDetailAddress?: string | null;
  venueJibunAddress?: string | null;
}

/**
 * 주소 정보를 포맷팅합니다.
 * 세 개의 주소 값 중 하나라도 없으면 DEFAULT_TEXT를 반환합니다.
 */
const addressFormatter = ({
  venueRoadAddress,
  venueDetailAddress,
  venueJibunAddress,
}: AddressParams): string => {
  if (!venueRoadAddress || !venueDetailAddress || !venueJibunAddress) {
    return DEFAULT_TEXT;
  }

  return `${venueRoadAddress} ${venueDetailAddress} (${venueJibunAddress})`;
};

export default addressFormatter;
