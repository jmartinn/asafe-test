import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | A-SAFE Demo',
    default: 'A-SAFE Demo - Technical Test Project',
  },
  description:
    'Technical test demonstration of a workplace safety management platform (not an official A-SAFE product)',
  keywords: [
    'safety',
    'workplace',
    'management',
    'incidents',
    'reporting',
    'demo',
    'technical test',
  ],
  authors: [{ name: 'Technical Test Candidate' }],
  creator: 'Technical Test Demo',
  publisher: 'Technical Test Project',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://asafe-test.vercel.app'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asafe-test.vercel.app',
    title: 'A-SAFE Demo - Technical Test Project',
    description:
      'Technical test demonstration of a workplace safety management platform (not an official A-SAFE product)',
    siteName: 'A-SAFE Technical Demo',
    images: [
      {
        url: '/favicon.ico',
        width: 100,
        height: 101,
        alt: 'A-SAFE logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-SAFE Demo - Technical Test Project',
    description:
      'Technical test demonstration of a workplace safety management platform (not an official A-SAFE product)',
    images: ['/favicon.ico'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#09090b')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
