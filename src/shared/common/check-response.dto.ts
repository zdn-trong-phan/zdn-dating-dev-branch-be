export type TCheckedResponse<T> = {
  statusCode?: number;
  data?: {
    checked?: boolean;
    data?: T;
  };
  phone?: string;
};
