import ChatHeader from "@/components/main/chat/ChatHeader";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { Text, View } from "@/components/ui/Themed";
import { useMessages } from "@/hooks/useMessages";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { loading, selectedChat, messages } = useMessages(chatID)

  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ChatHeader selectedChat={selectedChat} />
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
