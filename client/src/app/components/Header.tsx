import Link from 'next/link'
import { Home, Heart } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 flex items-center transition-colors duration-300">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 rounded-lg mr-2">TG</span>
          TamaGen
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center transition-colors duration-300">
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center transition-colors duration-300">
              <Heart className="w-5 h-5 mr-2" />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  )
}

