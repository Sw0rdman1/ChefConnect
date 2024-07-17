import { supabase } from "@/config/supabase";

export async function getCategoriesBasedOnSelectedCategory(selectedCategoryID: string) {
    let query = supabase.from("categories").select("*");

    if (selectedCategoryID) {
        query = query
            .ilike("id", selectedCategoryID + "%")
            .neq("id", selectedCategoryID);
    } else {
        query = query.in("id", ["001", "002"]);
    }

    let { data: categories, error } = await query;

    if (error) {
        console.log(error);
        throw error;
    }

    if (categories) {
        return categories;
    } else {
        return [];
    }

}


export async function getCategoryByID(selectedCategoryID: string) {
    if (!selectedCategoryID) {
        return undefined
    }

    let { data: category, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", selectedCategoryID)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    if (category) {
        return category;
    } else {
        return undefined;
    }
}