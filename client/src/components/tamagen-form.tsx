"use client";
import { useState } from "react";
import { Loader2, Plus, Minus, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/config/api";
import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "@/types/recipe";

type FormProps = {
  setRecipe: (recipe: Recipe | null) => void;
};

export default function TamaGenForm({ setRecipe }: FormProps) {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    servings: 2,
    difficulty: "medium",
    cuisine: "any",
    dietary: "none",
    cookingTime: 30,
    calories: 500,
  });

  const randomIngredients = [
    "chicken",
    "beef",
    "salmon",
    "tofu",
    "pasta",
    "rice",
    "potatoes",
    "tomatoes",
    "mushrooms",
    "spinach",
    "onions",
    "garlic",
    "carrots",
    "broccoli",
    "eggs",
    "cheese",
    "lemon",
    "olive oil",
    "soy sauce",
    "ginger",
  ];

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const fillRandomData = () => {
    const getRandomNumber = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const getRandomElements = (arr: string[], count: number) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const ingredientCount = getRandomNumber(3, 5);
    const randomIngs = getRandomElements(randomIngredients, ingredientCount);

    const randomFormData = {
      servings: getRandomNumber(2, 6),
      difficulty: ["easy", "medium", "hard"][getRandomNumber(0, 2)],
      cuisine: [
        "any",
        "turkish",
        "italian",
        "chinese",
        "indian",
        "mexican",
        "japanese",
        "mediterranean",
        "american",
        "french",
      ][getRandomNumber(0, 9)],
      dietary: ["none", "vegetarian", "vegan", "gluten_free", "dairy_free"][
        getRandomNumber(0, 4)
      ],
      cookingTime: getRandomNumber(15, 60),
      calories: getRandomNumber(300, 800),
    };

    setIngredients(randomIngs);
    setFormData(randomFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch(`${API_URL}/generate-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients, formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data: Recipe = await response.json();
      setRecipe(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          TamaGen
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Transform ingredients into recipes
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={fillRandomData}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Random Fill
          </Button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Label>Ingredients</Label>
              <AnimatePresence>
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-2"
                  >
                    <Input
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      placeholder="Add an ingredient..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      className="hover:text-destructive"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) =>
                setFormData({ ...formData, difficulty: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cuisine</Label>
            <Select
              value={formData.cuisine}
              onValueChange={(value) =>
                setFormData({ ...formData, cuisine: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="turkish">Turkish</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="indian">Indian</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
                <SelectItem value="american">American</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dietary Preference</Label>
            <Select
              value={formData.dietary}
              onValueChange={(value) =>
                setFormData({ ...formData, dietary: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten_free">Gluten Free</SelectItem>
                <SelectItem value="dairy_free">Dairy Free</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Servings</Label>
            <Input
              type="number"
              value={formData.servings}
              onChange={(e) =>
                setFormData({ ...formData, servings: parseInt(e.target.value) })
              }
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Cooking Time (min)</Label>
            <Input
              type="number"
              value={formData.cookingTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cookingTime: parseInt(e.target.value),
                })
              }
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label>Calories per Serving</Label>
            <Input
              type="number"
              value={formData.calories}
              onChange={(e) =>
                setFormData({ ...formData, calories: parseInt(e.target.value) })
              }
              min="1"
            />
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={loading || ingredients.every((ing) => ing.trim() === "")}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate Recipe
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
