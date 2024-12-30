export interface Recipe {
  metadata: {
    cuisine: string;
    dietary: string;
    difficulty: string;
    language: string;
    servings: number;
    cookingTime: number;
  };
  recipe: string;
}
