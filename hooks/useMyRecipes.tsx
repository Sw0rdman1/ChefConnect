import { useApp } from "@/context/AppContext";
import Recipe from "@/models/Recipe";
import { getRecipesByUserID } from "@/services/RecipeService";
import { useEffect, useState } from "react";

export const useMyRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useApp();

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await getRecipesByUserID(user?.id as string, user?.id as string);
            setRecipes(recipes);
            setLoading(false);
        };

        fetchRecipes();
    }, []);

    return { recipes, loading };
}