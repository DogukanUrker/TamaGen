import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TamaGen - AI Recipe Generator',
  description: 'Generate delicious recipes from your available ingredients',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

