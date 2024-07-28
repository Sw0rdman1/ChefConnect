import LoadingScreen from "@/components/ui/LoadingScreen";
import { Animated, StyleSheet } from "react-native";
import { View } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { useRecipe } from "@/hooks/useRecipes";
import { router, useLocalSearchParams } from "expo-router";
import AnimatedHeader from "@/components/ui/AnimatedHeader";
import RecipeHeader from "@/components/main/recipe/RecipeHeader";
import RecipeTitle from "@/components/main/recipe/RecipeTitle";
import IngredientsList from "@/components/main/recipe/IngredientsList";
import SaveButton from "@/components/main/recipe/SaveButton";
import RecipeInstructions from "@/components/main/recipe/RecipeInstructions";
import { useRef } from "react";

const RecipeScreen = () => {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { recipeID } = useLocalSearchParams<{ recipeID: string }>();
  const { tint, background } = useColors();
  const { recipe, loading } = useRecipe(recipeID as string);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!recipe) {
    router.back();
    return null;
  }

  return (
    <AnimatedHeader
      scrollOffsetY={scrollOffsetY}
      headerComponent={<RecipeHeader recipe={recipe} />}
      minHeight={300}
      maxHeight={550}
    >
      <View style={[styles.container, { backgroundColor: `${background}95` }]}>
        <RecipeTitle recipe={recipe} />
        <SaveButton />
        <IngredientsList recipeID={recipe.id} />
        <RecipeInstructions instructions={recipe.steps} />
        <View style={{ height: 50 }} />
      </View>
    </AnimatedHeader>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
