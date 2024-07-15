import { createContext, useContext, useState } from "react";
import { Recipe } from "@/models/Recipe";
import { useRecipes } from "@/hooks/useRecipes";

interface RecipesContextProps {
  recipes: Recipe[];
  searchTerm: string;
  category: string;
  setSearchTerm: (value: string) => void;
  setCategory: (value: string) => void;
}

export const RecipesContext = createContext<RecipesContextProps>({
  recipes: [],
  searchTerm: "",
  category: "",
  setSearchTerm: () => {},
  setCategory: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const recipes = useRecipes(searchTerm, category);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        category,
        searchTerm,
        setCategory,
        setSearchTerm,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipesContext = () => {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error("useRecipesContext must be used within an RecipesContext");
  }
  return context;
};
