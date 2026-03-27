
import type { IUseAntiOp } from '~/operations/IUseAntiOp';
import { resolveAntiOp } from '~/operations/resolver';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const antiOp: IUseAntiOp = resolveAntiOp(config.public.antiOp);
  nuxtApp.provide('antiOp', antiOp);
});