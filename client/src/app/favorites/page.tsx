import FavoriteRecipes from '../components/FavoriteRecipes'

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Your Favorite Recipes</h1>
        <FavoriteRecipes />
      </div>
    </div>
  )
}

