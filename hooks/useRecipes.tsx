import { useToast } from "@/context/ToastNotificationContext";
import Recipe from "@/models/Recipe";
import { getRecipeByID, getRecipes } from "@/services/RecipeService";
import { useEffect, useState } from "react";

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    description: "A delicious pasta dish",
    category: "001003",
    ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan"],
    steps: [
      "Cook pasta",
      "Fry bacon",
      "Mix eggs and cheese",
      "Combine everything",
    ],
    bannerImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400",
    prepareTime: 30,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Chicken Curry",
    description: "A spicy chicken dish",
    category: "001004",
    ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
    steps: ["Fry onion", "Add chicken and spices", "Cook until done"],
    bannerImage:
      "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg",
    prepareTime: 45,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-02T12:00:00Z",
  },
  {
    id: "3",
    title: "Chocolate Cake",
    description: "A sweet dessert",
    category: "002001",
    ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"],
    steps: ["Mix ingredients", "Bake in oven", "Cool and serve"],
    bannerImage:
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
    prepareTime: 60,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-03T12:00:00Z",
  },
  {
    id: "4",
    title: "Caesar Salad",
    description: "A fresh salad",
    category: "002002",
    ingredients: ["Lettuce", "Croutons", "Parmesan", "Dressing"],
    steps: ["Mix ingredients", "Serve cold"],
    bannerImage:
      "https://www.allrecipes.com/thmb/JTW0AIVY5PFxqLrf_-CDzT4OZQY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
    prepareTime: 15,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-04T12:00:00Z",
  },
  {
    id: "5",
    title: "Margarita Pizza",
    description: "A classic pizza",
    category: "002003",
    ingredients: ["Dough", "Tomato", "Mozzarella", "Basil"],
    steps: ["Roll out dough", "Add toppings", "Bake in oven"],
    bannerImage:
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spivack.jpg",
    prepareTime: 30,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-05T12:00:00Z",
  },
  {
    id: "6",
    title: "Beef Stew",
    description: "A hearty stew",
    category: "001002",
    ingredients: ["Beef", "Potatoes", "Carrots", "Onion"],
    steps: ["Brown beef", "Add vegetables", "Simmer until tender"],
    bannerImage:
      "https://mojo.generalmills.com/api/public/content/LASaPpVD5E6LGty8lf97zA_webp_base.webp?v=0971028d&t=e724eca7b3c24a8aaa6e089ed9e611fd",
    prepareTime: 120,
    createdBy: {
      displayName: 'Bozidar',
      email: 'vujasinovicb2019@gmail.com',
      bio: 'Ja sam kuhar',
      id: '1',
      profilePicture: '',
      updated_at: new Date()

    },
    created_at: "2021-01-06T12:00:00Z",
  },
];

export const useRecipes = (searchTerm: string, category: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchSelectedCategory() {
      try {
        setLoading(true);
        const recipes = await getRecipes(category, searchTerm);
        setRecipes(recipes);
      } catch (error) {
        showToast({
          severity: 'error',
          text: 'Failed to fetch recipes'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedCategory();
  }, [searchTerm, category]);

  return { loading, recipes };
};

export const useTrenindRecipes = (selectedCategory: 'trending' | 'bestRated' | 'new') => {
  if (selectedCategory === 'trending') {
    return recipes.slice(0, 3)
  }
  if (selectedCategory === 'bestRated') {
    return recipes.slice(1, 4)
  }
  if (selectedCategory === 'new') {
    return recipes.slice(2, 5)
  }
}

export const useRecipe = (recipeID: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const recipe = await getRecipeByID(recipeID);
        setRecipe(recipe);
      } catch (error) {
        showToast({
          severity: 'error',
          text: 'Failed to fetch recipe'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeID]);

  return { loading, recipe };
}
