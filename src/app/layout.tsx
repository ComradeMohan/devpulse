import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'DevPulse | Your GitHub Analytics',
  description: 'A professional, multi-page developer analytics website that you can configure for your own GitHub profile.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("font-body antialiased bg-background text-foreground min-h-screen flex flex-col")}>
        <FirebaseClientProvider>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
