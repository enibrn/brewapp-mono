import { AppwriteBackendServiceFactory } from './providers/appwrite';
import type { CloudConfig, MyResult } from './core';
import type { BackendService } from './backend';

export async function buildBackendService(config: CloudConfig): Promise<MyResult<BackendService>> {
  const backendServiceFactory = new AppwriteBackendServiceFactory(config);
  return backendServiceFactory.create();
}