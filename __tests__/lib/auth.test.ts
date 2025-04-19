import bcrypt from 'bcryptjs';

import { comparePassword, hashPassword } from '@/lib/db';

jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password_123'),
  compare: jest.fn().mockImplementation((plain, hash) => {
    return Promise.resolve(hash.endsWith(plain));
  }),
}));

describe('Auth Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('hashPassword', () => {
    it('should hash a password using bcrypt', async () => {
      const plainPassword = 'password123';
      const result = await hashPassword(plainPassword);

      expect(bcrypt.hash).toHaveBeenCalledWith(plainPassword, 10);
      expect(result).toBe('hashed_password_123');
    });
  });

  describe('comparePassword', () => {
    it('should correctly verify a matching password', async () => {
      const plainPassword = 'password123';
      const hashedPassword = 'some_hash_password123';

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it('should correctly reject a non-matching password', async () => {
      const plainPassword = 'password123';
      const hashedPassword = 'some_hash_wrong';

      const result = await comparePassword(plainPassword, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
