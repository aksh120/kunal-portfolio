import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
//import Footer from '@/components/Footer';
import LenisProvider from '@/components/providers/LenisProvider';
import AppShell from '@/components/providers/AppShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Kunal Kamde - Portfolio',
  description: 'Product Designer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${space.variable} font-sans bg-background`}>        
        <LenisProvider>
          <Header />
          <AppShell splashMinDuration={3000} oncePerSession={false}>
            <main>{children}</main>
            {/* <Footer /> */}
          </AppShell>
        </LenisProvider>
      </body>
    </html>
  );
}
