import ChatHeader from "@/components/main/chat/ChatHeader";
import Message from "@/components/main/chat/Message";
import MessageInput from "@/components/main/chat/MessageInput";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { useMessages } from "@/hooks/useMessages";
import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { loading, selectedChat, messages } = useMessages(chatID)
  const { backgroundDarker } = useColors();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ChatHeader selectedChat={selectedChat} />
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        inverted
        ListHeaderComponent={<MessageInput chatID={chatID} />}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
