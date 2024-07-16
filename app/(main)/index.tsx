import FilterBottomSheet from "@/components/main/home/FilterBottomSheet";
import RecipesList from "@/components/main/home/RecipesList";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import RecipeListHeader from "@/components/main/home/RecipeListHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";

const MainScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { background, backgroundDarker } = useColors();

  return (
    <LinearGradient colors={[background, backgroundDarker]} style={{ flex: 1 }}>
      <RecipeListHeader />
      <RecipesList />
      <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
    </LinearGradient>
  );
};

export default MainScreen;


