import type { MyUser, CloudConfig } from './types';
import { MyResult } from './result';

export interface AuthService {
  login(email: string, password: string): Promise<MyResult<MyUser>>;
  logout(): Promise<MyResult<void>>;
  init(): Promise<MyResult<MyUser|null>>;
}

export interface BackendService {
  auth: AuthService | null;
  init(config: CloudConfig): Promise<MyResult<void>>;
}
