import { View } from "@/components/ui/Themed";
import { StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";
import MainScreenHeader from "@/components/main/home/MainScreenHeader";
import FilterBottomSheet from "@/components/main/home/FilterBottomSheet";
import RecipesList from "@/components/main/home/RecipesList";

const MainScreen = () => {
  const { backgroundDarker } = useColors();

  return (
    <View style={[styles.container, { backgroundColor: backgroundDarker }]}>
      <MainScreenHeader />
      <RecipesList />
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
