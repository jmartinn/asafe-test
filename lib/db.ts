import bcrypt from 'bcryptjs';

import { type User } from '@/lib/schemas/user';

export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, pwdHash: string): Promise<boolean> {
  return bcrypt.compare(password, pwdHash);
}

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@asafe.com',
    role: 'ADMIN',
    image: null,
    hashedPassword: '$2b$10$kUp4LMzyCUf/hlF2jEJtn.zTAC5e1bWUGA4GJakf.sSz32W/1YQMy', // password123
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@asafe.com',
    role: 'USER',
    image: null,
    hashedPassword: '$2b$10$kUp4LMzyCUf/hlF2jEJtn.zTAC5e1bWUGA4GJakf.sSz32W/1YQMy', // password123
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
];

const verificationTokens: VerificationToken[] = [];

export const db = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return users.find((user) => user.email === where.email) || null;
      }
      if (where.id) {
        return users.find((user) => user.id === where.id) || null;
      }
      return null;
    },
    findFirst: async ({ where }: { where: { email?: string } }) => {
      if (where.email) {
        return users.find((user) => user.email === where.email) || null;
      }
      return null;
    },
    update: async ({
      where,
      data,
    }: {
      where: { email?: string; id?: string };
      data: Partial<User>;
    }) => {
      let user: User | null = null;

      if (where.email) {
        user = users.find((u) => u.email === where.email) || null;
      } else if (where.id) {
        user = users.find((u) => u.id === where.id) || null;
      }

      if (!user) return null;

      const updatedUser = { ...user, ...data, updatedAt: new Date() };
      const index = users.findIndex((u) => u.id === user!.id);
      users[index] = updatedUser;

      return updatedUser;
    },
    findMany: async () => {
      return [...users];
    },
    delete: async ({ where }: { where: { id: string } }) => {
      const index = users.findIndex((user) => user.id === where.id);
      if (index !== -1) {
        const deletedUser = users[index];
        users.splice(index, 1);
        return deletedUser;
      }
      return null;
    },
  },
  verificationToken: {
    create: async ({ data }: { data: VerificationToken }) => {
      verificationTokens.push(data);
      return data;
    },
    findFirst: async ({ where }: { where: { identifier: string; token?: string } }) => {
      if (where.token) {
        return (
          verificationTokens.find(
            (token) => token.identifier === where.identifier && token.token === where.token,
          ) || null
        );
      }
      return verificationTokens.find((token) => token.identifier === where.identifier) || null;
    },
    delete: async ({ where }: { where: { identifier: string; token: string } }) => {
      const index = verificationTokens.findIndex(
        (token) => token.identifier === where.identifier && token.token === where.token,
      );
      if (index !== -1) {
        const token = verificationTokens[index];
        verificationTokens.splice(index, 1);
        return token;
      }
      return null;
    },
  },
};
