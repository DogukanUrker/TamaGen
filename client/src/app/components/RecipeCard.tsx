'use client'

import { useState } from 'react'
import { Heart, Download, Clock, Users } from 'lucide-react'
import Image from 'next/image'

interface Recipe {
  title: string
  ingredients: string[]
  steps: string[]
  image: string
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real application, you would save this to a database or local storage
  }

  const downloadPDF = () => {
    // In a real application, you would generate and download a PDF here
    alert('Downloading PDF...')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative h-64">
        <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-60 flex items-end justify-start p-6">
          <h2 className="text-3xl font-bold text-white">{recipe.title}</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 mr-2" />
            <span>30 min</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users className="w-5 h-5 mr-2" />
            <span>4 servings</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Ingredients:</h3>
          <ul className="grid grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-2"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Instructions:</h3>
          <ol className="space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                <span className="font-bold mr-2">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={toggleFavorite}
            className={`flex items-center ${isFavorite ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'} hover:text-red-500 transition duration-300`}
          >
            <Heart className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />
            {isFavorite ? 'Saved' : 'Save to Favorites'}
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-300"
          >
            <Download className="mr-1" />
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  )
}

