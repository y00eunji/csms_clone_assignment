// 토큰을 저장하는 함수
export const setTokens = (accessToken: string, refreshToken: string): void => {
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('refreshToken', refreshToken);
};

// 토큰을 가져오는 함수
export const getTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  const accessToken = sessionStorage.getItem('accessToken');
  const refreshToken = sessionStorage.getItem('refreshToken');
  return { accessToken, refreshToken };
};

// 토큰을 삭제하는 함수
export const clearTokens = (): void => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
};
