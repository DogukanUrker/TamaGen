'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function IngredientForm() {
  const [ingredients, setIngredients] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push(`/recipe?ingredients=${encodeURIComponent(ingredients)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken, tomato, pasta"
          className="w-full px-5 py-4 rounded-full border-2 border-green-300 dark:border-green-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
          required
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-4 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </span>
        ) : (
          'Generate Recipe'
        )}
      </button>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        Try entering: chicken, tomato, pasta
      </p>
    </form>
  )
}

