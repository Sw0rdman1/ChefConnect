import { supabase } from "@/config/supabase";
import { useToast } from "@/context/ToastNotificationContext";
import { Category } from "@/models/Category";
import { getCategoriesBasedOnSelectedCategory, getCategoryByID } from "@/services/CategoryService";
import { useEffect, useState } from "react";

export function useCategories(selectedCategoryID: string) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategoriesBasedOnSelectedCategory(selectedCategoryID)

        setCategories(categories);
      } catch (error) {
        showToast({
          severity: 'error',
          text: 'Failed to fetch categories'
        });
      } finally {
        setLoading(false);
      }

    }

    fetchCategories();
  }, [selectedCategoryID]);

  return { loading, categories };
}

export function useSelectedCategory(selectedCategoryID: string) {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchSelectedCategory() {
      try {
        const selectedCategory = await getCategoryByID(selectedCategoryID)

        setSelectedCategory(selectedCategory);
      } catch (error) {
        showToast({
          severity: 'error',
          text: 'Failed to fetch categories'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedCategory();
  }, [selectedCategoryID]);

  return { loading, selectedCategory };
}
