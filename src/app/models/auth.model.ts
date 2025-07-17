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
  displayName: string;
  username: string;
}

export interface PostListDto {
  id: number;
  title: string;
  content: string;
  timestamp: Date;
  user: UserDto;
  repliesCount: number;
}
