import type { IUseAntiOp } from '../IUseAntiOp';

export function useInverseOp(): IUseAntiOp {
  const perform = (a: number): number => {
    if (a === 0) {
      throw new Error('Division by zero');
    }
    return 1 / a;
  };

  const getType = (): string => {
    return 'InverseOp';
  };

  return { perform, getType };
}