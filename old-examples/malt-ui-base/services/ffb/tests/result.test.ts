import { test, expect } from 'bun:test';
import { MyResult, MyError } from '../result';

// Test per MyResult
test('MyResult.success crea un risultato di successo', () => {
  const data = { id: '1', name: 'test' };
  const result = MyResult.success(data);
  
  expect(result.success).toBe(true);
  expect(result.data).toEqual(data);
  expect(result.error).toBeNull();
});

test('MyResult.failure crea un risultato di errore', () => {
  const error = new Error('Test error');
  const result = MyResult.failure<string>(error);
  
  expect(result.success).toBe(false);
  expect(result.data).toBeNull();
  expect(result.error).not.toBeNull();
});

test('isFailure ritorna true per risultati falliti', () => {
  const result = MyResult.failure<number>(new Error('Test'));
  expect(result.isFailure()).toBe(true);
});

test('isFailure ritorna false per risultati di successo', () => {
  const result = MyResult.success(42);
  expect(result.isFailure()).toBe(false);
});

test('map trasforma i dati nei risultati di successo', () => {
  const result = MyResult.success({ value: 5 })
    .map(data => data.value * 2);
  
  expect(result.success).toBe(true);
  expect(result.data).toBe(10);
});

test('map non trasforma i dati nei risultati di errore', () => {
  const error = new Error('Original error');
  const result = MyResult.failure<{value: number}>(error)
    .map(data => data.value * 2);
  
  expect(result.success).toBe(false);
  expect(result.error?.message).toBe('Original error');
});

// Test per MyError
test('MyError.fromError converte da Error', () => {
  const originalError = new Error('Test error');
  const myError = MyError.fromError(originalError);
  
  expect(myError.message).toBe('Test error');
  expect(myError.errors).toEqual({});
});

test('MyError.fromUnknown converte da stringa', () => {
  const myError = MyError.fromUnknown('Test error string');
  
  expect(myError.message).toBe('Test error string');
});

test('MyError.fromUnknown gestisce oggetti sconosciuti', () => {
  const myError = MyError.fromUnknown({ random: 'object' });
  
  expect(myError.message).toBe('Unknown error occurred');
});

test('MyError può associare errori a campi specifici', () => {
  const myError = MyError.fromError(new Error('Email invalid'));
  myError.errors = { email: 'Formato email non valido' };
  
  expect(myError.errors.email).toBe('Formato email non valido');
});