import { supabase } from "@/config/supabase";
import Recipe from "@/models/Recipe";
import { snakeToCamel } from "@/utils/caseConverter";

export const getRecipes = async (
  selectedCategoryID: string,
  searchTerm: string,
  userID: string
) => {
  let query = supabase.from("recipes").select("*").order("created_at", { ascending: false });

  if (selectedCategoryID) {
    query = query.ilike("category", selectedCategoryID + "%");
  }

  if (searchTerm) {
    query = query.ilike("title", searchTerm + "%");
  }

  let { data: recipes, error } = await query;

  if (error) {
    console.log(error);
    throw error;
  }

  if (recipes) {
    const { data: saves } = await supabase
      .from("saves")
      .select("recipe_id")
      .eq("user_id", userID);

    if (saves) {
      recipes = recipes.map((recipe) => {
        return {
          ...recipe,
          isSaved: saves.some((save) => save.recipe_id === recipe.id),
        };
      });
    }
    return snakeToCamel(recipes) as Recipe[];
  } else {
    return [];
  }
};

export const getTrendingRecipes = async (
  selectedCategory: "trending" | "bestRated" | "new"
) => {
  let query = supabase.from("recipes").select("*");

  if (selectedCategory === "trending") {
    query = query.order("created_at", { ascending: false }).limit(3);
  }
  if (selectedCategory === "bestRated") {
    query = query.order("created_at", { ascending: false }).limit(3);
  }
  if (selectedCategory === "new") {
    query = query.order("created_at", { ascending: false }).limit(3);
  }

  let { data: recipes, error } = await query;

  if (error) {
    console.log(error);
    throw error;
  }

  if (recipes) {
    return recipes;
  } else {
    return [];
  }
};

export const getRecipeByID = async (recipeID: string) => {
  let { data: recipe, error } = await supabase
    .from("recipes")
    .select("*, created_by(*)")
    .eq("id", recipeID)
    .single();

  if (error) {
    console.log(error);
    throw error;
  }

  if (recipe) {
    return snakeToCamel(recipe) as Recipe;
  } else {
    return null;
  }
};

export const getRecipeIngredients = async (recipeID: string) => {
  let { data: ingredients, error } = await supabase
    .from("recipe_ingredients")
    .select("ingredients(*)")
    .eq("recipe_id", recipeID);

  if (error) {
    console.log(error);
    throw error;
  }

  if (ingredients) {
    const ingredientsFormatted = ingredients?.map(
      (ingredient) => ingredient.ingredients
    );

    return snakeToCamel(ingredientsFormatted);
  } else {
    return [];
  }
};

export const getRecipesByUserID = async (userID: string, currentUserID: string) => {
  let query = supabase.from("recipes").select("*");
  query = query.eq("created_by", userID)

  let { data: recipes, error } = await query;

  if (error) {
    console.log(error);
    throw error;
  }

  if (recipes) {
    const { data: saves } = await supabase
      .from("saves")
      .select("recipe_id")
      .eq("user_id", currentUserID);

    if (saves) {
      recipes = recipes.map((recipe) => {
        return {
          ...recipe,
          isSaved: saves.some((save) => save.recipe_id === recipe.id),
        };
      });
    }
    return snakeToCamel(recipes) as Recipe[];
  } else {
    return [];
  }
};


export const getSavedRecipes = async (userID: string) => {
  let { data: saves, error } = await supabase
    .from("saves")
    .select("recipe_id")
    .eq("user_id", userID);

  if (error) {
    console.log(error);
    throw error;
  }

  if (saves) {
    const recipeIDs = saves.map((save) => save.recipe_id);

    let { data: recipes, error } = await supabase
      .from("recipes")
      .select("*")
      .in("id", recipeIDs);

    if (error) {
      console.log(error);
      throw error;
    }

    if (recipes) {
      recipes = recipes.map((recipe) => {
        return {
          ...recipe,
          isSaved: true,
        };
      });
      return snakeToCamel(recipes) as Recipe[];
    } else {
      return [];
    }
  } else {
    return [];
  }
}
