import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";
import { useColors } from "@/hooks/useColors";

const RecipesList = () => {
  const { recipes } = useRecipesContext();
  const { backgroundDarker } = useColors();

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
      ListFooterComponent={
        <View style={{ height: 200, backgroundColor: backgroundDarker }} />
      }
    />
  );
};

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    paddingTop: 10,
  },
});
