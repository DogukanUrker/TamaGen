'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Clock, Users } from 'lucide-react'
import Image from 'next/image'

interface Recipe {
  id: string
  title: string
  image: string
  time: string
  servings: number
}

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<Recipe[]>([
    { id: '1', title: 'Chicken Tomato Pasta', image: 'https://images.unsplash.com/photo-1673174433770-d3b2889f8955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', time: '30 min', servings: 4 },
    { id: '2', title: 'Vegetable Stir Fry', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80', time: '20 min', servings: 3 },
    { id: '3', title: 'Beef Tacos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', time: '25 min', servings: 2 },
  ])

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favorites.map((recipe, index) => (
        <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-1">
          <div className="relative h-48">
            <Image src={recipe.image} alt={recipe.title} layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-60 flex items-end justify-start p-4">
              <h2 className="text-xl font-semibold text-white">{recipe.title}</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.time}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {recipe.servings} servings
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Link href={`/recipe?id=${recipe.id}`} className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 font-semibold">
                View Recipe
              </Link>
              <button
                onClick={() => removeFromFavorites(recipe.id)}
                className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition duration-300 flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

