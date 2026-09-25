export function isValidUsername(value: string): boolean {
  return /^[A-Za-z0-9_]{3,30}$/.test(value.trim());
}