/**
 * URL에서 프로토콜과 호스트만 추출
 */
export const extractOrigin = (url?: string | null) => {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    if (url.startsWith('//')) {
      return new URL(`https:${url}`).origin;
    }
    return null;
  }
};

/**
 * 서버가 보낸 주소를 완전한 https 주소로 만듦
 */
export const toAbsoluteUrl = (
  rawUrl: string | undefined,
  fallbackOrigins: Array<string | null>,
) => {
  if (!rawUrl) return null;
  try {
    return new URL(rawUrl).toString();
  } catch {
    if (rawUrl.startsWith('//')) {
      return `https:${rawUrl}`;
    }
    const origin = fallbackOrigins.find((candidate) => candidate && candidate.length > 0) ?? null;
    if (origin) {
      return `${origin.replace(/\/+$/, '')}/${rawUrl.replace(/^\/+/, '')}`;
    }
    if (rawUrl.startsWith('/')) {
      return `https://${rawUrl.replace(/^\/+/, '')}`;
    }
    return `https://${rawUrl}`;
  }
};
