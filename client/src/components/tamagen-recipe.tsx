"use client";
import { Clock, ChefHat } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Recipe } from "@/types/recipe";

type RecipeProps = {
  recipe: Recipe | null;
};

export default function TamaGenRecipe({ recipe }: RecipeProps) {
  if (!recipe) {
    return (
      <div className="h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ChefHat className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Your recipe will appear here</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Your Recipe</CardTitle>
        </CardHeader>
        <CardContent className="">
          {recipe.metadata && (
            <div className="grid grid-cols-2 gap-4 hidden">
              <Badge
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <Clock className="w-4 h-4" />
                <span>{recipe.metadata.cookingTime} minutes</span>
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center justify-center gap-2 py-3"
              >
                <ChefHat className="w-4 h-4" />
                <span>
                  Difficulty:{" "}
                  {recipe.metadata.difficulty.charAt(0).toUpperCase() +
                    recipe.metadata.difficulty.slice(1)}
                </span>
              </Badge>
            </div>
          )}

          <div className="prose prose-invert max-w-none whitespace-pre-wrap">
            <MarkdownRenderer content={recipe.recipe} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
