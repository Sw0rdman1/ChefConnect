import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastNotificationContext";
import { Ingredient } from "@/models/Ingredient";
import Recipe from "@/models/Recipe";
import {
  getRecipeByID,
  getRecipeIngredients,
  getRecipes,
} from "@/services/RecipeService";
import { useEffect, useState } from "react";

export const useRecipes = (searchTerm: string, category: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const { user } = useApp();

  useEffect(() => {
    async function fetchSelectedCategory() {
      try {
        setLoading(true);
        const recipes = await getRecipes(category, searchTerm, user?.id || "");
        setRecipes(recipes);
      } catch (error) {
        showToast({
          severity: "error",
          text: "Failed to fetch recipes",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedCategory();
  }, [searchTerm, category]);

  return { loading, recipes };
};

export const useRecipe = (recipeID: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const recipe = await getRecipeByID(recipeID);
        setRecipe(recipe);

        const ingredients = await getRecipeIngredients(recipeID);
        setIngredients(ingredients);
      } catch (error) {
        showToast({
          severity: "error",
          text: "Failed to fetch recipe",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeID]);

  return { loading, recipe, ingredients };
};
