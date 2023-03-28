export type THttpResponse<T> = {
  statusCode?: number;
  message?: string;
  data?: T;
};
