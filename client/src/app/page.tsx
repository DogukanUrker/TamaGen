import IngredientForm from './components/IngredientForm'
import { ChefHat } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-center mb-8">
          <ChefHat className="w-12 h-12 text-green-500 dark:text-green-400 mr-4" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white text-center">
            What's in your kitchen?
          </h1>
        </div>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-8">
          Let TamaGen create a delicious meal for you!
        </p>
        <IngredientForm />
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="font-semibold">Pricing:</p>
          <p>First 10 recipes are free!</p>
          <p>After that, only $0.2 per recipe</p>
        </div>
      </div>
    </div>
  )
}

