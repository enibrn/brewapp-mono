import type { IUseOperation } from '~/operations/IUseOperation';
import type { IUseAntiOp } from '~/operations/IUseAntiOp';

declare module '#app' {
  interface NuxtApp {
    $operation: IUseOperation;
    $antiOp: IUseAntiOp;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $operation: IUseOperation;
    $antiOp: IUseAntiOp;
  }
}

export {}