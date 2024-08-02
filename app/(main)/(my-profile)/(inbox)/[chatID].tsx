import ChatHeader from "@/components/main/chat/ChatHeader";
import Message from "@/components/main/chat/Message";
import MessageInput from "@/components/main/chat/MessageInput";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, View } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { useMessages } from "@/hooks/useMessages";
import { useLocalSearchParams } from "expo-router";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { loading, selectedChat, messages, setMessages } = useMessages(chatID)
  const { backgroundDarker } = useColors();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <ChatHeader selectedChat={selectedChat} />
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 150, backgroundColor: backgroundDarker, flexGrow: 1 }}
        inverted
      />
      <MessageInput chatID={chatID} setMessages={setMessages} />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
