"use client";

import TamaGenForm from "@/components/tamagen-form";
import TamaGenRecipe from "@/components/tamagen-recipe";
import { useState } from "react";
import { Recipe } from "@/types/recipe";

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="lg:w-1/2 p-6 lg:p-12">
          <TamaGenForm setRecipe={setRecipe} />
        </div>
        <div className="lg:w-1/2 p-6 lg:p-12 border-l border-border/10">
          <TamaGenRecipe recipe={recipe} />
        </div>
      </div>
    </main>
  );
}
