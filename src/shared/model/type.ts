export interface ApiResponse<T> {
  resultCode: number;
  description: string;
  needRedirect: boolean;
  resultData: T;
}

export type FilterType = 'operating' | 'pause' | 'stop' | 'none';
