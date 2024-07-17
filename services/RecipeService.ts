import { supabase } from "@/config/supabase";

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
        return recipes;
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

    if (recipes) {
        return recipes;
    } else {
        return [];
    }

}    