import Recipe from "@/models/Recipe";

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
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400",
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
    image:
      "https://www.allrecipes.com/thmb/FL-xnyAllLyHcKdkjUZkotVlHR8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/46822-indian-chicken-curry-ii-DDMFS-4x3-39160aaa95674ee395b9d4609e3b0988.jpg",
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
    image:
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
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
