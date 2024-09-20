export interface ApiResponse<T> {
  resultCode: number;
  description: string;
  needRedirect: boolean;
  resultData: T;
}
