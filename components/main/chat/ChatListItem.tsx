import Avatar from "@/components/ui/Avatar";
import { Text } from "@/components/ui/Themed";
import { useColors } from "@/hooks/useColors";
import { Chat } from "@/models/Chat";
import { generateTimeString } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ChatListItemProps {
  chat: Chat;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  const { tint, text } = useColors();
  const { lastMessage } = chat;

  const openChatHandler = () => {
    router.push(`/${chat.id}`);
  }

  if (!lastMessage) {
    return null;
  }

  const isYourMessage = lastMessage.userId !== chat.participant.id

  return (
    <TouchableOpacity onPress={openChatHandler} style={[styles.container, { borderBottomColor: `${text}20` }]}>
      <Avatar size={55} source={chat.participant.profilePicture} />
      <View style={styles.textContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.displayName}>{chat.participant.displayName}</Text>
          <Text style={{ color: "gray" }}>
            {generateTimeString(lastMessage.createdAt)}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Ionicons
            name="checkmark-done-outline"
            size={20}
            color={isYourMessage ?
              lastMessage.isRead ? tint : text
              : "transparent"
            }
          />
          <Text style={styles.message}>
            {lastMessage.text}
          </Text>
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
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  bottomContainer: {
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
});
