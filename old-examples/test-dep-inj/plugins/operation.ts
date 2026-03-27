
import type { IUseOperation } from '~/operations/IUseOperation';
import { resolveOperation } from '~/operations/resolver';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const operation: IUseOperation = resolveOperation(config.public.operation);
  nuxtApp.provide('operation', operation);
});