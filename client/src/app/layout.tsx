import { Metadata } from 'next';
//@ts-ignore
import { GeistSans } from 'geist/font/sans';
import { Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { UserRecordDataProvider } from '@/context/UserRecordDataContext';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swiftdns.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SwiftDNS — a calm layer over Cloudflare DNS',
    template: '%s · SwiftDNS',
  },
  description:
    'Save the IPs and names you already use. Apply them to any Cloudflare zone in one click. Bulk-edit DNS records across every domain you own.',
  keywords: [
    'cloudflare dns',
    'dns manager',
    'bulk dns editor',
    'dns records',
    'multi-zone dns',
    'cloudflare api',
    'ip presets',
    'swiftdns',
  ],
  authors: [{ name: 'Geeth Gunnampalli' }],
  creator: 'Geeth Gunnampalli',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'SwiftDNS — a calm layer over Cloudflare DNS',
    description:
      'Save your IPs and names once. Apply them to any Cloudflare zone in one click.',
    siteName: 'SwiftDNS',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftDNS — a calm layer over Cloudflare DNS',
    description:
      'Save your IPs and names once. Apply them to any Cloudflare zone in one click.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      >
        <AuthProvider>
          <UserRecordDataProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="relative min-h-dvh bg-background">
                <Navbar />
                {children}
              </div>
            </ThemeProvider>
          </UserRecordDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
