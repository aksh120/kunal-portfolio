import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LenisProvider from '@/components/providers/LenisProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Kunal - Portfolio',
  description: 'Freelance Product Designer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${space.variable} font-sans bg-background`}>        
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
