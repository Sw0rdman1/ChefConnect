import { supabase } from "@/config/supabase";
import { Ingredient } from "@/models/Ingredient";

export const getAllIngredients = async () => {
    const { data, error } = await supabase.from("ingredients").select("*");

    if (error) {
        throw error;
    }

    return data as Ingredient[];
}