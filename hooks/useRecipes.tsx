import { Recipe } from "@/models/Recipe";

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
    image: "https://images.unsplash.com/photo-1606783566129-0e8f3f6e9f3d",
    prepareTime: 30,
    created_by: "1",
    created_at: "2021-01-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Chicken Curry",
    description: "A spicy chicken dish",
    category: "001004",
    ingredients: ["Chicken", "Onion", "Tomato", "Spices"],
    steps: ["Fry onion", "Add chicken and spices", "Cook until done"],
    image: "https://images.unsplash.com/photo-1606783566129-0e8f3f6e9f3d",
    prepareTime: 45,
    created_by: "2",
    created_at: "2021-01-02T12:00:00Z",
  },
  {
    id: "3",
    title: "Chocolate Cake",
    description: "A sweet dessert",
    category: "002001",
    ingredients: ["Flour", "Sugar", "Cocoa", "Eggs"],
    steps: ["Mix ingredients", "Bake in oven", "Cool and serve"],
    image: "https://images.unsplash.com/photo-1606783566129-0e8f3f6e9f3d",
    prepareTime: 60,
    created_by: "3",
    created_at: "2021-01-03T12:00:00Z",
  },
];

export const useRecipes = (searchTerm: string, category: string) => {
  const filteredRecipes = recipes.filter((recipe) => {
    if (searchTerm) {
      return recipe.title.toLowerCase().startsWith(searchTerm.toLowerCase());
    }
    if (category) {
      return recipe.category.toLowerCase().startsWith(category.toLowerCase());
    }
    return true;
  });

  return filteredRecipes;
};
