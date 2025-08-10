import bcrypt from 'bcryptjs';

const _SALT_ROUNDS = 10;

/**
 * Hash a plain text string (e.g., password).
 * @param plainText - The string to hash
 * @returns Promise<string> - The hashed value
 */
export const hash = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt(_SALT_ROUNDS);
  return bcrypt.hash(plainText, salt);
};

/**
 * Compare a plain text string with a hash.
 * @param plainText - The plain string (e.g., input password)
 * @param hashed - The hashed string (e.g., from DB)
 * @returns Promise<boolean>
 */

export const hashCompare = async (plainText: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hashed);
};
