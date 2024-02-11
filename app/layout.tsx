import './globals.css';
import { inter } from './_core/ui/fonts';
import { Metadata } from 'next';
import { NavBar } from '@/components/molecules';

export const metadata: Metadata = {
  title: {
    template: '%s | R-Cloud',
    default: 'R-Cloud',
  },
  description: 'could storage service app',
  metadataBase: new URL('https://r-cloud.vercel.app'),
  keywords: ['r-cloud', 'r cloud', 'could', 'service', 'storage', 'google-drive', 'Roger', 'Rash', 'R'],
  manifest: '/manifest.json',
  authors: [
    {
      url: 'https://twitter.com/orashus',
      name: 'Rash Edmund'
    },
    {
      url: 'https://twitter.com/orashus',
      name: 'Roger'
    }
  ],
  openGraph: {
    type: 'website',
    description: 'cloud storage progressive web application',
    siteName: 'R-cloud',
    title: 'R-cloud',
  },
};

interface Props {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <meta name='theme-color' content='#5588ff' />
      </head>

      <body className={inter.className}>
        <NavBar />

        <>
          {children}
        </>
      </body>
    </html>
  );
}
