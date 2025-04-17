'use server';

import { redirect } from 'next/navigation';

import { signIn, signOut } from '@/lib/auth';

export async function CredentialsLogin(formData: { email: string; password: string }) {
  return await signIn('credentials', formData);
}

export async function handleSignOut() {
  await signOut();
  redirect('/login');
}
