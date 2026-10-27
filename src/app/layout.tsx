import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ai-taskpilot-szn.vercel.app'),
  title: 'TaskPilot AI — The 2026 AI-Native Project Management SaaS',
  description: 'Convert high-level goals into structured roadmaps, manage dependencies via real-time Kanban boards, and generate automated executive risk reports.',
  icons: {
    icon: '/assets/logo.svg',
  },
  openGraph: {
    title: 'TaskPilot AI — The 2026 AI-Native Project Management SaaS',
    description: 'Convert high-level goals into structured roadmaps, manage dependencies via real-time Kanban boards, and generate automated executive risk reports.',
    url: 'https://ai-taskpilot-szn.vercel.app',
    siteName: 'TaskPilot AI',
    images: [
      {
        url: '/assets/hero-dashboard.svg',
        width: 1200,
        height: 720,
        alt: 'TaskPilot AI Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#090D16' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-canvas text-foreground antialiased selection:bg-primary-subtle selection:text-primary">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
