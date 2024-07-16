import { StyleSheet } from "react-native";
import { Text, View } from "../../ui/Themed";
import Avatar from "../../ui/Avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

interface MainScreenHeaderProps {
  openFilterBottomSheet: () => void;
}

const MainScreenHeader: React.FC<MainScreenHeaderProps> = ({ openFilterBottomSheet }) => {
  const { top } = useSafeAreaInsets();
  const { tint } = useColors();
  const { user } = useApp();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + 5 },
      ]}
    >
      <Avatar size={35} href="(my-profile)" source={user?.profilePicture} />
      <Text style={[styles.title, { color: tint }]}>ChefConnect</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={openFilterBottomSheet}>
        <Ionicons name="filter" size={22} color={tint} />
      </TouchableOpacity>
    </View>
  );
};

export default MainScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
