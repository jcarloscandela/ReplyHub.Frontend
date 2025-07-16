export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface UserDto {
  id: number;
  diplayName: string;
  username: string;
}
