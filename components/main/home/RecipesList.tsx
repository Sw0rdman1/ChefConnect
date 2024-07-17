import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";
import TrendingRecipeList from "./TrendingRecipeList";
import RecipeListHeader from "./RecipeListHeader";
import MainScreenHeader from "./MainScreenHeader";
import { useColors } from "@/hooks/useColors";
import Button from "@/components/ui/Button";

interface RecipesListProps {
  openFiltersHandler: () => void;
}

const RecipesList: React.FC<RecipesListProps> = ({ openFiltersHandler }) => {
  const { recipes, loading, setSearchTerm, setSelectedCategoryID } = useRecipesContext();
  const { tint } = useColors();

  const removeFiltersHandler = () => {
    setSelectedCategoryID("");
    setSearchTerm("");
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <MainScreenHeader />
        <ActivityIndicator style={{ marginTop: 250 }} size="large" color={tint} />
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <View style={styles.container}>
        <MainScreenHeader />
        <Text style={styles.text}>
          Unfortunatly, we couldn't find any recipes for you. 🥺
        </Text>
        <Button onPress={removeFiltersHandler} text="Show all" />
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: 'transparent' }}
      data={recipes}
      renderItem={({ item: recipe }) => <RecipeCard recipe={recipe} />}
      keyExtractor={(recipe) => recipe.id}
      ListHeaderComponent={
        <View style={{}}>
          <TrendingRecipeList />
          <RecipeListHeader openFiltersHandler={openFiltersHandler} />
        </View>
      }
      ListFooterComponent={
        <View style={{ height: 100, backgroundColor: 'transparent' }} />
      }
    />
  );
};

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 250,
  },
});
