import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";

const RecipesList = () => {
  const { recipes } = useRecipesContext();

  if (recipes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No recipes found</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={recipes}
      renderItem={({ item: recipe }) => <RecipeCard recipe={recipe} />}
      keyExtractor={(recipe) => recipe.id}
    />
  );
};

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});
