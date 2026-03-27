import type { IUseOperation } from '../IUseOperation';

export function useAddOperation(): IUseOperation {
  const perform = (a: number, b: number): number => {
    return a + b;
  };

  const getType = (): string => {
    return 'AddOperation';
  };

  return { perform, getType };
}