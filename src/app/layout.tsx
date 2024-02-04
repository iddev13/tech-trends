import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import QueryProvider from '@/providers/QueryProvider'
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/providers/ThemeProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import AuthProvider from '@/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Trends',
  description: 'Tech Trends Blog Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col max-w-[100vw] min-h-screen overflow-x-hidden pt-12 text-text-color bg-bg-color`}>
        <AuthProvider>
          <QueryProvider>
            <ThemeContextProvider>
              <ThemeProvider>
                <Header />
                <main className='flex-auto'>{children}</main>
                <Footer />
              </ThemeProvider>
            </ThemeContextProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
