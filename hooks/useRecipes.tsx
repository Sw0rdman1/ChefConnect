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
  {
    id: "4",
    title: "Caesar Salad",
    description: "A fresh salad",
    category: "002002",
    ingredients: ["Lettuce", "Croutons", "Parmesan", "Dressing"],
    steps: ["Mix ingredients", "Serve cold"],
    image:
      "https://www.allrecipes.com/thmb/JTW0AIVY5PFxqLrf_-CDzT4OZQY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg",
    prepareTime: 15,
    created_by: "4",
    created_at: "2021-01-04T12:00:00Z",
  },
  {
    id: "5",
    title: "Margarita Pizza",
    description: "A classic pizza",
    category: "002003",
    ingredients: ["Dough", "Tomato", "Mozzarella", "Basil"],
    steps: ["Roll out dough", "Add toppings", "Bake in oven"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c8/Pizza_Margherita_stu_spivack.jpg",
    prepareTime: 30,
    created_by: "5",
    created_at: "2021-01-05T12:00:00Z",
  },
  {
    id: "6",
    title: "Beef Stew",
    description: "A hearty stew",
    category: "001002",
    ingredients: ["Beef", "Potatoes", "Carrots", "Onion"],
    steps: ["Brown beef", "Add vegetables", "Simmer until tender"],
    image:
      "https://mojo.generalmills.com/api/public/content/LASaPpVD5E6LGty8lf97zA_webp_base.webp?v=0971028d&t=e724eca7b3c24a8aaa6e089ed9e611fd",
    prepareTime: 120,
    created_by: "6",
    created_at: "2021-01-06T12:00:00Z",
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