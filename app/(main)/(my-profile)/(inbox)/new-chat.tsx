import { Text, View } from "@/components/ui/Themed";
import { StyleSheet } from "react-native";

const NewChatModal = () => {
  return (
    <View style={styles.container}>
      <Text>NewChatModal</Text>
    </View>
  );
};

export default NewChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
