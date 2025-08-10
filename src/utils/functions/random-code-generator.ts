export function generateCode(length = 6, type: 'numeric' | 'alphanumeric' = 'numeric'): string {
  const numericChars = '0123456789';
  const alphaNumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const chars = type === 'numeric' ? numericChars : alphaNumericChars;
  let code = '';

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}
