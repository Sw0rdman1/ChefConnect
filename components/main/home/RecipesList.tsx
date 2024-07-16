import { Text, View } from "@/components/ui/Themed";
import { useRecipesContext } from "@/context/RecipesContext";
import { FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";
import { useColors } from "@/hooks/useColors";
import MainScreenHeader from "./MainScreenHeader";

const RecipesList = () => {
  const { recipes } = useRecipesContext();
  const { backgroundDarker } = useColors();

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
      ListHeaderComponent={<MainScreenHeader />}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      style={{ flex: 1 }}
      data={recipes}
      renderItem={({ item: recipe }) => <RecipeCard recipe={recipe} />}
      keyExtractor={(recipe) => recipe.id}
      ListFooterComponent={
        <View style={{ height: 100, backgroundColor: backgroundDarker }} />
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

  },
});
