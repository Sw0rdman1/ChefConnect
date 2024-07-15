import { View } from "@/components/ui/Themed";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";
import MainScreenHeader from "@/components/main/home/MainScreenHeader";
import FilterBottomSheet from "@/components/main/home/FilterBottomSheet";
import { useRecipesContext } from "@/context/RecipesContext";
import { useEffect } from "react";

const MainScreen = () => {
  const { background, backgroundDarker } = useColors();
  const { recipes } = useRecipesContext();

  useEffect(() => {
    console.log(recipes.length);
  }, [recipes]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[background, background, backgroundDarker]}
        style={styles.linearGradient}
      />
      <MainScreenHeader />
      <FilterBottomSheet />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
