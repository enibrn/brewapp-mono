import type { IUseOperation } from '../IUseOperation';

export function useMulOperation(): IUseOperation {
  const perform = (a: number, b: number): number => {
    return a * b;
  };

  const getType = (): string => {
    return 'MulOperation';
  };

  return { perform, getType };
}