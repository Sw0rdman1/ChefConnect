import { StyleSheet } from "react-native";
import { Text, View } from "../../ui/Themed";
import Avatar from "../../ui/Avatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useApp } from "@/context/AppContext";
import { BlurView } from "expo-blur";

const MainScreenHeader = () => {
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
      <Text style={[styles.title, { color: tint }]}>ChefConnect</Text>
      <Avatar size={35} href="(my-profile)" source={user?.profilePicture} />
    </View>
  );
};

export default MainScreenHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 20,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
