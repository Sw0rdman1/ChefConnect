import FilterBottomSheet from "@/components/main/home/FilterBottomSheet";
import RecipesList from "@/components/main/home/RecipesList";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useColors } from "@/hooks/useColors";
import MainScreenHeader from "@/components/main/home/MainScreenHeader";

const MainScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { background, backgroundDarker } = useColors();

  const openFiltersHandler = () => {
    bottomSheetRef.current?.expand();
  }

  return (
    <LinearGradient colors={[background, backgroundDarker]} style={{ flex: 1 }}>
      <MainScreenHeader />
      <RecipesList openFiltersHandler={openFiltersHandler} />
      <FilterBottomSheet bottomSheetRef={bottomSheetRef} />
    </LinearGradient>
  );
};

export default MainScreen;


