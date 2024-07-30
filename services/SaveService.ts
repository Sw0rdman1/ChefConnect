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

const saveRecipe = async (recipeID: string, userID: string) => {
  let { error } = await supabase.from("saves").insert([
    {
      recipe_id: recipeID,
      user_id: userID,
    },
  ]);

  if (error) {
    console.log(error);
    throw error;
  }
};

const unsaveRecipe = async (recipeID: string, userID: string) => {
  let { error } = await supabase
    .from("saves")
    .delete()
    .eq("recipe_id", recipeID)
    .eq("user_id", userID);

  if (error) {
    console.log(error);
    throw error;
  }
};

export const handleSaveClick = async (
  recipeID: string,
  isSaved: boolean,
  userID: string
) => {
  if (isSaved) {
    await unsaveRecipe(recipeID, userID);
  } else {
    await saveRecipe(recipeID, userID);
  }
};
