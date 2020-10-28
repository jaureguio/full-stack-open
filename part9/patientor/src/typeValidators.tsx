/* eslint-disable @typescript-eslint/no-explicit-any */
export function assertNever (val: never): never {
  throw new Error(`Unhandled entry ${val}`); 
}

export function inRangeInclusive({min, max, value}: Record<string,number>): boolean {
  return min <= value && value <= max;
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

export function isFormatted(val: string): boolean {
  return /\b\d{4}-\d{2}-\d{2}\b/.test(val);
}