import { supabase } from "@/config/supabase";

export const isRecipeSaved = async (recipeID: string, userID: string) => {
  let { data: savedRecipes, error } = await supabase
    .from("saves")
    .select("*")
    .eq("recipe_id", recipeID)
    .eq("user_id", userID);

  if (error) {
    console.log(error);
    throw error;
  }

  if (savedRecipes) {
    return savedRecipes.length > 0;
  } else {
    return false;
  }
};
