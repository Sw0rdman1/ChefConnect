import { Ingredient } from "@/models/Ingredient";
import { getAllIngredients } from "@/services/Ingredients";
import { useEffect, useState } from "react";

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredients = await getAllIngredients();
            setIngredients(ingredients);
        };

        fetchIngredients();
    }, []);

    return {
        ingredients,
        setIngredients,
    }
}