import type { IUseOperation } from './IUseOperation';
import { useAddOperation } from './add/useAddOperation';
import { useMulOperation } from './mul/useMulOperation';

import type { IUseAntiOp } from './IUseAntiOp';
import { useOppositeOp } from './add/useOppositeOp';
import { useInverseOp } from './mul/useInverseOp';

const OperationTypeValues = <const>['add', 'mul'];
type OperationType = typeof OperationTypeValues[number]; 
function isOperationType(value: unknown): value is OperationType {
  return OperationTypeValues.some((x) => value === x);
}

const operationDictionary: Record<OperationType, IUseOperation> = {
  add: useAddOperation(),
  mul: useMulOperation()
};

const antiOpDictionary: Record<OperationType, IUseAntiOp> = {
  add: useOppositeOp(),
  mul: useInverseOp()
};

export function resolveOperation(value: unknown): IUseOperation {
  if (!isOperationType(value)) {
    throw new Error('Invalid operation type');
  }
  return operationDictionary[value];
}

export function resolveAntiOp(value: unknown): IUseAntiOp {
  if (!isOperationType(value)) {
    throw new Error('Invalid antiOp type');
  }
  return antiOpDictionary[value];
}
