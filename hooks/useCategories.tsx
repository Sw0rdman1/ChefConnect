import { supabase } from "@/config/supabase";
import { Category } from "@/models/Category";
import { useEffect, useState } from "react";

export function useCategories(selectedCategoryID: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      let query = supabase.from("categories").select("*");

      if (selectedCategoryID) {
        query = query
          .ilike("id", selectedCategoryID + "%")
          .neq("id", selectedCategoryID);
      } else {
        query = query.in("id", ["001", "002"]);
      }

      let { data: categories, error } = await query;

      console.log("categories", categories);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (categories) {
        setCategories(categories);
        setLoading(false);
      }
    }

    fetchCategories();
  }, [selectedCategoryID]);

  return { loading, categories };
}

export function useSelectedCategory(selectedCategoryID: string) {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  useEffect(() => {
    async function fetchSelectedCategory() {
      if (!selectedCategoryID) {
        setSelectedCategory(undefined);
        return;
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
        setSelectedCategory(category);
      }
    }

    fetchSelectedCategory();
  }, [selectedCategoryID]);

  return selectedCategory;
}
