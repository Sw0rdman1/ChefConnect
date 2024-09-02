import { useApp } from "@/context/AppContext";
import Recipe from "@/models/Recipe";
import { getSavedRecipes } from "@/services/RecipeService";
import { useEffect, useState } from "react";

export const useSavedRecipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useApp();

    useEffect(() => {
        const fetchIngredients = async () => {
            const recipes = await getSavedRecipes(user?.id as string);
            setRecipes(recipes);
            setLoading(false);
        };

        fetchIngredients();
    }, []);


    return { recipes, loading };
}