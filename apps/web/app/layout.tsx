import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anizium',
  description: 'Dünyanın ilk ve tek 4K Anime izleme platformu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <body className={cn(montserrat.className, 'flex min-h-screen flex-col')}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
