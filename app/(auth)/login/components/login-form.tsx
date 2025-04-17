'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// import { CredentialsLogin } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, { message: 'Please enter a valid password' }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      signIn('credentials', values);
    } catch (error) {
      console.error('Login failed!\n', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-brand/20 shadow-lg dark:border-brand/10 dark:bg-gray-900">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Safety Management System
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-800 dark:text-gray-100">
          Secure access to the safety monitoring dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      autoFocus
                      type="email"
                      placeholder="name@asafe.com"
                      disabled={isLoading}
                      className="focus-visible:ring-brand dark:border-gray-700 dark:bg-gray-800"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="#"
                      className="text-xs text-brand transition-colors hover:text-brand/80 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        disabled={isLoading}
                        className="focus-visible:ring-brand dark:border-gray-700 dark:bg-gray-800"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4 text-gray-500" />
                        ) : (
                          <Eye className="size-4 text-gray-500" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
              disabled={isLoading}
            >
              {!isLoading ? (
                'Login'
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              )}
            </Button>
          </form>
        </Form>
        {/* Development mode helper */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 rounded-md border border-muted bg-muted/20 p-3 text-xs text-muted-foreground">
            <p className="font-semibold">Development Credentials</p>
            <p className="mt-1">
              Admin: <code>admin@asafe.com</code> / <code>password123</code>
            </p>
            <p>
              User: <code>user@asafe.com</code> / <code>password123</code>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
