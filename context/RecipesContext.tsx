import { createContext, useContext, useState } from "react";
import Recipe from "@/models/Recipe";
import { useRecipes } from "@/hooks/useRecipes";

interface RecipesContextProps {
  recipes: Recipe[];
  searchTerm: string;
  selectedCategoryID: string;
  setSearchTerm: (value: string) => void;
  setSelectedCategoryID: (value: string) => void;
  loading: boolean;
}

export const RecipesContext = createContext<RecipesContextProps>({
  recipes: [],
  searchTerm: "",
  selectedCategoryID: "",
  setSearchTerm: () => { },
  setSelectedCategoryID: () => { },
  loading: true,
});

interface RecipeProviderProps {
  children: React.ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const { recipes, loading } = useRecipes(searchTerm, selectedCategoryID);

  return (
    <RecipesContext.Provider
      value={{
        loading,
        recipes,
        selectedCategoryID,
        searchTerm,
        setSelectedCategoryID,
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
