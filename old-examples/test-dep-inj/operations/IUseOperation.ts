export interface IUseOperation {
  perform(a: number, b: number): number;
  getType(): string;
}