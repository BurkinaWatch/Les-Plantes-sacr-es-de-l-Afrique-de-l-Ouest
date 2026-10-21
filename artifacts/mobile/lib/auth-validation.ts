export function isValidUsername(value: string): boolean {
  return /^[A-Za-z0-9_]{3,30}$/.test(value.trim());
}

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}