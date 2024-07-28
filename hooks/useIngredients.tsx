import { useToast } from "@/context/ToastNotificationContext";
import { Ingredient } from "@/models/Ingredient";
import { getRecipeIngredients } from "@/services/RecipeService";
import { useState } from "react";
import { useEffect } from "react";

export const useIngredients = (recipeID: string) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await getRecipeIngredients(recipeID);

        setIngredients(ingredients);
      } catch (error) {
        showToast({
          severity: "error",
          text: "Failed to fetch ingredients",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, [recipeID]);

  return { loading, ingredients };
};
