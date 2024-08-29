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
import RecipeInfo from "@/components/main/recipe/RecipeInfo";

const RecipeScreen = () => {
  const { recipeID } = useLocalSearchParams<{ recipeID: string }>();
  const { background } = useColors();
  const { recipe, ingredients, loading } = useRecipe(recipeID as string);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

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
      minHeight={250}
      maxHeight={500}
    >
      <View style={[styles.container, { backgroundColor: `${background}95` }]}>
        <RecipeTitle recipe={recipe} />
        <RecipeInfo recipe={recipe} />
        <SaveButton recipe={recipe} />
        <IngredientsList ingredients={ingredients} />
        <RecipeInstructions instructions={recipe.instructions} />
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
