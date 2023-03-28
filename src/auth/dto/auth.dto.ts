export class AuthDto {
  statusCode?: number;
  data?: {
    token: string;
    expiresIn?: string;
  };
}
