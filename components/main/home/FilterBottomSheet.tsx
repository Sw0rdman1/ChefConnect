import { StyleSheet } from "react-native";
import { Text } from "@/components/ui/Themed";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import Handle from "../../ui/BottomSheetHandle";
import SearchInput from "./SearchInput";
import { useColors } from "@/hooks/useColors";
import CategorySelect from "./CategorySelect";


interface FilterBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ bottomSheetRef }) => {
  const { background } = useColors();


  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: background }}
      snapPoints={[60, 480]}
      ref={bottomSheetRef}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      )}
      handleComponent={(values) => (
        <Handle
          animatedPosition={values.animatedPosition}
          animatedIndex={values.animatedIndex}
        />
      )}
    >
      <BottomSheetView
        style={[styles.container, { backgroundColor: background }]}
      >
        <Text style={styles.title}>Find that one recipe you love</Text>
        <SearchInput />
        <CategorySelect />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "800",
    marginVertical: 20,
  },
});
