import { View } from "@/components/ui/Themed";
import { StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";
import MainScreenHeader from "@/components/main/home/MainScreenHeader";
import FilterBottomSheet from "@/components/main/home/FilterBottomSheet";
import RecipesList from "@/components/main/home/RecipesList";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";

const MainScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const openFilterBottomSheet = () => {
    bottomSheetRef.current?.expand();
  }

  return (
    <View style={styles.container}>
      <RecipesList />
      <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
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
