import Avatar from "@/components/ui/Avatar";
import { Text } from "@/components/ui/Themed";
import { useMessages } from "@/context/MessagesContext";
import { useColors } from "@/hooks/useColors";
import { Chat } from "@/models/Chat";
import { generateTimeString } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ChatListItemProps {
  chat: Chat;
  markChatAsRead: (chatID: string) => Promise<void>;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, markChatAsRead }) => {
  const { tint, text } = useColors();
  const { setSelectedChatID, messages } = useMessages();
  const { lastMessage } = chat;

  const openChatHandler = async () => {
    setSelectedChatID(chat.id);
    router.push(`/${chat.id}`);
    await markChatAsRead(chat.id);
  }

  if (!lastMessage) {
    return null;
  }

  const message = messages.find((m) => m.chatID === chat.id);
  const sortedMessages = messages.sort((a, b) => a.createdAt - b.createdAt);

  const isYourMessage = lastMessage.userId !== chat.participant.id

  return (
    <TouchableOpacity onPress={openChatHandler} style={[styles.container, { borderBottomColor: `${text}20` }]}>
      <Avatar size={55} source={chat.participant.profilePicture} />
      <View style={styles.textContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.displayName}>{chat.participant.displayName}</Text>
          <Text style={{ fontWeight: "500", color: chat.unreadCount > 0 ? tint : "gray" }}>
            {generateTimeString(lastMessage.createdAt)}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.messageContainer}>
            {isYourMessage && <Ionicons
              name="checkmark-done-outline"
              size={20}
              color={lastMessage.isRead ? tint : text}
            />}
            <Text style={styles.message}>
              {lastMessage.text}
            </Text>
          </View>
          {chat.unreadCount > 0 && (
            <View style={[styles.unreadMessagesContainer, { backgroundColor: tint }]}>
              <Text style={styles.unreadMessagesText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 100,
    borderBottomWidth: 1,
    paddingRight: 20,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  displayName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
    color: "gray",
  },
  unreadMessagesContainer: {
    width: 22,
    height: 22,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadMessagesText: {
    color: "white",
    fontWeight: "bold",
  },
});
