import type { IUseAntiOp } from '../IUseAntiOp';

export function useOppositeOp(): IUseAntiOp {
  const perform = (a: number): number => {
    return -a;
  };

  const getType = (): string => {
    return 'OppositeOp';
  };

  return { perform, getType };
}