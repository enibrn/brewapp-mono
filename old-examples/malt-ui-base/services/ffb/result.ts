export class MyResult<T> {
  readonly data: T | null;
  readonly error: MyError | null;
  readonly success: boolean;

  private constructor(data: T | null, error: MyError | null, success: boolean) {
    this.data = data;
    this.error = error;
    this.success = success;
  }

  static success<T>(data: T): MyResult<T> {
    return new MyResult<T>(data, null, true);
  }

  static failure<T>(error: unknown): MyResult<T> {
    return new MyResult<T>(null, MyError.fromUnknown(error), false);
  }

  isFailure(): boolean {
    return !this.success;
  }

  map<R>(fn: (data: T) => R): MyResult<R> {
    if (this.success && this.data !== null) {
      return MyResult.success(fn(this.data));
    }
    return MyResult.failure<R>(this.error!);
  }
}

export class MyError extends Error {
  errors: { [field: string]: string; };

  private constructor(message: string) {
    super(message);
    this.errors = {};
  }

  static fromError(error: Error): MyError {
    return new MyError(error.message);
  }

  static fromUnknown(unknown: unknown): MyError {
    if (unknown instanceof Error) {
      return MyError.fromError(unknown);
    } else if (typeof unknown === 'string') {
      return new MyError(unknown);
    } else {
      return new MyError('Unknown error occurred');
    }
  }
}