import { Icons } from '@/components/icons';

import { LoginForm } from './components/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-b from-brand/5 to-brand/10 p-4 dark:from-background dark:to-background/95 md:p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Icons.logo className="mb-2" />
        </div>

        <LoginForm />

        <div className="text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} A-Safe Digital Inc. All rights reserved.</p>
          <p className="mt-1">For internal use only. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
}
