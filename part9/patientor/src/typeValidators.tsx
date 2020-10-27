export function assertNever (val: never): never {
  throw new Error(`Unhandled entry ${JSON.stringify(val)}`); 
}