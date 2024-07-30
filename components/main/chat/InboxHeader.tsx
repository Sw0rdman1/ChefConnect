import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const InboxHeader = () => {
  const { tint } = useColors();
  const { top } = useSafeAreaInsets();

  const goBackHandler = () => {
    router.back();
  };

  const openNewChatModal = () => {
    router.push("/new-chat");
  };

  return (
    <BlurView
      intensity={100}
      style={[styles.container, { paddingTop: top + 20 }]}
    >
      <View style={styles.left}>
        <TouchableOpacity onPress={goBackHandler}>
          <Ionicons name="chevron-back" size={28} color={tint} />
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={openNewChatModal}>
          <Ionicons name="add-circle" size={32} color={tint} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default InboxHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {},
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
