import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const users = await db.user.findMany();

    /* eslint-disable-next-line */
    const sanitizedUsers = users.map(({ hashedPassword, ...user }) => user);

    return NextResponse.json(sanitizedUsers);
  } catch (_error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
