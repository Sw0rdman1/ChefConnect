import ChatHeader from "@/components/main/chat/ChatHeader";
import Message from "@/components/main/chat/Message";
import MessageInput from "@/components/main/chat/MessageInput";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ScrollView, Text, View } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { useMessages } from "@/hooks/useMessages";
import { generateDateText, isDayChanged } from "@/utils/time";
import { useLocalSearchParams } from "expo-router";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";

const MessageDateSeparator = ({ date }: { date: Date }) => {

  return (
    <View style={styles.dateSeparator}>
      <Text style={styles.dateText}>{generateDateText(date)}</Text>
    </View>
  );
}

const ChatScreen = () => {
  const { chatID } = useLocalSearchParams<{ chatID: string }>();
  const { loading, selectedChat, messages, setMessages } = useMessages(chatID)
  const { background } = useColors();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!selectedChat) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: background }]}
      behavior="padding"
    >
      <ChatHeader selectedChat={selectedChat} />
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <>
            <Message message={item} />
            {index === messages.length - 1 || isDayChanged(item.createdAt, messages[index + 1].createdAt) ? (
              <MessageDateSeparator date={item.createdAt} />
            ) : null}
          </>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 150, backgroundColor: background, flexGrow: 1 }}
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
  dateSeparator: {
    alignItems: "center",
    padding: 5,
    paddingBottom: 20,
    backgroundColor: "transparent",
  },
  dateText: {
    color: "gray",
  },
});
