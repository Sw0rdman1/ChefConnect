import { supabase } from "@/config/supabase";
import Recipe from "@/models/Recipe";
import { snakeToCamel } from "@/utils/caseConverter";

export const getRecipes = async (selectedCategoryID: string, searchTerm: string) => {
    let query = supabase.from("recipes").select("*");

    if (selectedCategoryID) {
        query = query
            .ilike("category", selectedCategoryID + "%")
    }

    if (searchTerm) {
        query = query
            .ilike("title", searchTerm + "%")
    }

    let { data: recipes, error } = await query;

    if (error) {
        console.log(error);
        throw error;
    }

    if (recipes) {
        return snakeToCamel(recipes) as Recipe[];
    } else {
        return [];
    }
}

export const getTrendingRecipes = async (selectedCategory: 'trending' | 'bestRated' | 'new') => {
    let query = supabase.from("recipes").select("*");

    if (selectedCategory === 'trending') {
        query = query.order("created_at", { ascending: false }).limit(3)
    }
    if (selectedCategory === 'bestRated') {
        query = query.order("created_at", { ascending: false }).limit(3)
    }
    if (selectedCategory === 'new') {
        query = query.order("created_at", { ascending: false }).limit(3)
    }

    let { data: recipes, error } = await query;

    if (error) {
        console.log(error);
        throw error;
    }

    console.log(recipes);


    if (recipes) {
        return recipes;
    } else {
        return [];
    }

}

export const getRecipeByID = async (recipeID: string) => {
    let { data: recipe, error } = await supabase.from("recipes").select("*").eq("id", recipeID).single();

    if (error) {
        console.log(error);
        throw error;
    }

    if (recipe) {
        return snakeToCamel(recipe) as Recipe;
    } else {
        return null;
    }
}