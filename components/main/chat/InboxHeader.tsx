import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { Animated, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  scrollOffsetY: Animated.Value;
}

const InboxHeader: React.FC<Props> = ({ scrollOffsetY }) => {
  const { text } = useColors();
  const { top } = useSafeAreaInsets();

  const titleFontSize = scrollOffsetY.interpolate({
    inputRange: [-100, 200],
    outputRange: [40, 30],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Animated.Text
        style={[styles.title, { fontSize: titleFontSize, color: text }]}
      >
        Messages
      </Animated.Text>
    </View>
  );
};

export default InboxHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
