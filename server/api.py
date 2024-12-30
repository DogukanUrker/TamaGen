import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from typing import List, Dict, Optional, Union
from enum import Enum
from flask_cors import CORS

# Configure Gemini AI
genai.configure(api_key=os.getenv("geminiApiKey"))


class RecipeDifficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class DietaryPreference(str, Enum):
    NONE = "none"
    VEGETARIAN = "vegetarian"
    VEGAN = "vegan"
    GLUTEN_FREE = "gluten_free"
    DAIRY_FREE = "dairy_free"
    KETO = "keto"


class CuisineType(str, Enum):
    ANY = "any"
    TURKISH = "turkish"
    ITALIAN = "italian"
    CHINESE = "chinese"
    INDIAN = "indian"
    MEXICAN = "mexican"
    JAPANESE = "japanese"
    MEDITERRANEAN = "mediterranean"
    AMERICAN = "american"
    FRENCH = "french"


class RecipeRequest:
    """Class to validate and structure recipe generation requests."""

    def __init__(self, requestData: Dict):
        self.ingredients: List[str] = requestData.get("ingredients", [])
        self.servings: int = requestData.get("servings", 2)
        self.difficulty: RecipeDifficulty = RecipeDifficulty(
            requestData.get("difficulty", "medium")
        )
        self.cuisine: CuisineType = CuisineType(requestData.get("cuisine", "any"))
        self.dietary: DietaryPreference = DietaryPreference(
            requestData.get("dietary", "none")
        )
        self.language: str = requestData.get("language", "en")
        self.cookingTime: Optional[int] = requestData.get("cookingTime")  # in minutes
        self.calories: Optional[int] = requestData.get("calories")  # per serving

    def validate(self) -> tuple[bool, Optional[str]]:
        """
        Validates the recipe request parameters.

        Returns:
            tuple: (is_valid: bool, error_message: Optional[str])
        """
        if not self.ingredients:
            return False, "No ingredients provided"
        if self.servings < 1:
            return False, "Servings must be at least 1"
        if self.cookingTime is not None and self.cookingTime < 1:
            return False, "Cooking time must be at least 1 minute"
        if self.calories is not None and self.calories < 1:
            return False, "Calories must be at least 1"
        return True, None


# Create the model with specific configuration
generationConfig = {
    "temperature": 0.8,  # Slightly reduced for more consistent recipes
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generationConfig,
)

app = Flask(__name__)
CORS(app)


def generateRecipePrompt(recipeRequest: RecipeRequest) -> str:
    """
    Generates a detailed prompt for the AI based on user preferences.

    Args:
        recipeRequest: RecipeRequest object containing all recipe parameters

    Returns:
        str: Formatted prompt for the AI
    """
    ingredientsList = ", ".join(recipeRequest.ingredients)

    # Build the base prompt
    prompt = f"""You are a professional chef AI. Create a {recipeRequest.difficulty.value} recipe with these requirements:

Main ingredients: {ingredientsList}
Cuisine type: {recipeRequest.cuisine.value}
Dietary preference: {recipeRequest.dietary.value}
Servings: {recipeRequest.servings}
"""

    # Add optional requirements
    if recipeRequest.cookingTime:
        prompt += f"\nMaximum cooking time: {recipeRequest.cookingTime} minutes"
    if recipeRequest.calories:
        prompt += f"\nTarget calories per serving: {recipeRequest.calories}"

    prompt += """

Please provide the recipe in the following format:
1. Recipe title (creative and descriptive)
2. Total time (prep + cooking)
3. Difficulty level
4. Complete ingredients list with measurements
5. Step-by-step instructions
6. Nutritional information (approximate)
7. Serving suggestions
8. Chef's tips and variations

If applicable, include:
- Common substitutions
- Make-ahead instructions
- Storage recommendations

Do not include:
- Welcome messages, greetings, or author information
- References to the AI or the prompt
- Any other irrelevant information

Syntax: 
- Use bold for titles and subtitles

"""

    return prompt


@app.route("/generate-recipe", methods=["POST"])
def generateRecipe():
    """
    Endpoint to generate a customized recipe based on user preferences.

    Expected JSON payload:
    {
        "ingredients": ["list", "of", "ingredients"],
        "servings": 2,                    // optional, default: 2
        "difficulty": "easy|medium|hard",  // optional, default: medium
        "cuisine": "italian|chinese|...",  // optional, default: any
        "dietary": "none|vegetarian|...",  // optional, default: none
        "language": "en",                 // optional, default: en
        "cookingTime": 30,                // optional, in minutes
        "calories": 500                   // optional, per serving
    }

    Returns:
        JSON response with generated recipe or error message
    """
    print("Received request:")
    print(request.json)
    try:
        # Create and validate request object
        recipeRequest = RecipeRequest(request.json)
        isValid, errorMessage = recipeRequest.validate()

        if not isValid:
            return jsonify({"error": errorMessage}), 400

        # Generate and send prompt to AI
        recipePrompt = generateRecipePrompt(recipeRequest)
        chatSession = model.start_chat(history=[])
        aiResponse = chatSession.send_message(recipePrompt)

        if aiResponse.text:
            print(aiResponse.text)
            return jsonify(
                {
                    "recipe": aiResponse.text,
                    "metadata": {
                        "difficulty": recipeRequest.difficulty.value,
                        "cuisine": recipeRequest.cuisine.value,
                        "dietary": recipeRequest.dietary.value,
                        "servings": recipeRequest.servings,
                        "language": recipeRequest.language,
                        "cookingTime": recipeRequest.cookingTime,
                    },
                }
            )
        else:
            print(aiResponse)
            return jsonify({"error": "No response generated"}), 500

    except ValueError as valueError:
        print(valueError)
        return jsonify({"error": f"Invalid input: {str(valueError)}"}), 400
    except Exception as errorMessage:
        print(errorMessage)
        return jsonify({"error": str(errorMessage)}), 500


@app.route("/")
def index():
    return "Welcome to the Gemini AI Recipe Generator!"


if __name__ == "__main__":
    app.run()
