import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";
import TrendingRecipeList from "./TrendingRecipeList";
import RecipeListHeader from "./RecipeListHeader";
import MainScreenHeader from "./MainScreenHeader";
import { useColors } from "@/hooks/useColors";

interface RecipesListProps {
  openFiltersHandler: () => void;
}

const RecipesList: React.FC<RecipesListProps> = ({ openFiltersHandler }) => {
  const { recipes, loading } = useRecipesContext();
  const { tint } = useColors();

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
    gap: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    paddingHorizontal: 50,
    textAlign: "center",
    marginTop: 250,
  },
});
