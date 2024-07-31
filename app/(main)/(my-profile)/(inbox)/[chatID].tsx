import { Text, View } from "@/components/ui/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();

  return (
    <View style={styles.container}>
      <Text>{chatID}</Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
