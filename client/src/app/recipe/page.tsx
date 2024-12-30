import RecipeCard from '../components/RecipeCard'

export default function RecipePage({ searchParams }: { searchParams: { ingredients: string } }) {
  const { ingredients } = searchParams

  // In a real application, you would use the ingredients to generate a recipe using an AI service
  const mockRecipe = {
    title: 'Chicken Tomato Pasta',
    ingredients: ['250g pasta', '2 chicken breasts', '4 tomatoes', '2 cloves of garlic', 'Olive oil', 'Salt', 'Pepper'],
    steps: [
      'Cook pasta according to package instructions.',
      'Cut chicken into bite-sized pieces and season with salt and pepper.',
      'Heat olive oil in a pan and cook chicken until golden brown.',
      'Add minced garlic and diced tomatoes to the pan.',
      'Simmer for 10 minutes, then add cooked pasta and toss to combine.',
      'Serve hot and enjoy your meal!'
    ],
    image: 'https://images.unsplash.com/photo-1673174433770-d3b2889f8955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center">Your Generated Recipe</h1>
        <RecipeCard recipe={mockRecipe} />
      </div>
    </div>
  )
}

