export function assertNever (val: never): never {
  throw new Error(`Unhandled course entry ${JSON.stringify(val)}`); 
}