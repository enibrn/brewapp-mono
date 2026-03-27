import type { CloudConfig, MyResult } from '../core';
import type { AuthService } from '../auth';

export interface BackendService {
  auth: AuthService;
}

export interface BackendServiceFactory {
  config: CloudConfig;
  create(): Promise<MyResult<BackendService>>;
}