export const USER_API_ENDPOINTS = {
  USER_DATA: 'v1/users/me',
  NICKNAME_CHECK: `v1/users/nickname/check`,
  NICKNAME_CHANGE: `v1/users/me/nickname`,
  PROFILE_IMG_CHANGE: `v1/users/me/profile-image`,
} as const;
